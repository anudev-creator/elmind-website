// app/add-chapter/page.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';

// Define the base URL as a constant for easy management
const API_BASE_URL = 'https://elmind.tech/DailyUpdate';

export default function AddChapterPage() {
    // --- STATE MANAGEMENT ---
    // Data for dropdowns
    const [syllabuses, setSyllabuses] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);

    // Data for the form inputs
    const [formData, setFormData] = useState({
        syllabusTypeId: '',
        classSyllabusId: '',
        subjectId: '',
        chapterNumber: '',
        chapterName: '',
    });
    const [topics, setTopics] = useState('');

    // Data for the dynamic list of chapters shown on the page
    const [filteredChapters, setFilteredChapters] = useState([]);
    
    // NEW state to manage the form's mode: 'new' or 'addTopics'
    const [formMode, setFormMode] = useState('new');
    const [selectedChapter, setSelectedChapter] = useState(null);

    // State for loading indicators and user feedback messages
    const [isListLoading, setIsListLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    // --- DATA FETCHING ---
    // Fetch initial data (syllabuses, classes, subjects) when the page loads
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [syllabusRes, classRes, subjectRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/syllabustypes`),
                    fetch(`${API_BASE_URL}/classes`),
                    fetch(`${API_BASE_URL}/subjects`)
                ]);
                setSyllabuses(await syllabusRes.json());
                setClasses(await classRes.json());
                setSubjects(await subjectRes.json());
            } catch (error) {
                setMessage({ type: 'error', text: 'Failed to load initial data. Check API connection.' });
            } finally {
                setIsPageLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    // Fetch the list of chapters whenever the user changes a dropdown selection
    const fetchFilteredChapters = useCallback(async () => {
        const { syllabusTypeId, classSyllabusId, subjectId } = formData;
        if (!syllabusTypeId || !classSyllabusId || !subjectId) {
            setFilteredChapters([]);
            return;
        }
        setIsListLoading(true);
        try {
            const url = `${API_BASE_URL}/chapters-by-filter?syllabusTypeId=${syllabusTypeId}&classSyllabusId=${classSyllabusId}&subjectId=${subjectId}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Could not fetch chapters.');
            const data = await response.json();
            setFilteredChapters(data);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsListLoading(false);
        }
    }, [formData]);

    useEffect(() => {
        fetchFilteredChapters();
    }, [formData.syllabusTypeId, formData.classSyllabusId, formData.subjectId, fetchFilteredChapters]);

    // --- HANDLER FUNCTIONS ---
    // Updates form state when the user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Switches the form to "Add Topics" mode when the button is clicked
    const handleSelectChapterForTopics = (chapter) => {
        setFormMode('addTopics');
        setSelectedChapter(chapter);
        setFormData(prev => ({
            ...prev,
            chapterNumber: chapter.Chapter_Number,
            chapterName: chapter.Chapter_Name,
        }));
        setTopics('');
        setMessage({type: '', text: ''});
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    };

    // Switches the form back to "New Chapter" mode
    const handleSetNewChapterMode = () => {
        setFormMode('new');
        setSelectedChapter(null);
        setFormData(prev => ({
            ...prev,
            chapterNumber: '',
            chapterName: '',
        }));
        setTopics('');
        setMessage({type: '', text: ''});
    };

    // Handles the form submission for both modes
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        const topicsArray = topics.split('\n').filter(topic => topic.trim() !== '');
        if (topicsArray.length === 0) {
            setMessage({ type: 'error', text: 'Please enter at least one topic.' });
            return;
        }

        try {
            let response;
            if (formMode === 'new') {
                // Logic for adding a brand new chapter
                const body = JSON.stringify({ ...formData, topics: topicsArray });
                response = await fetch(`${API_BASE_URL}/add-chapter-with-topics`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
                });
            } else {
                // Logic for adding topics to an existing chapter
                const body = JSON.stringify({ chapterId: selectedChapter.id, topics: topicsArray });
                response = await fetch(`${API_BASE_URL}/add-topics-to-chapter`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
                });
            }
            
            const result = await response.json();
            if (!response.ok) throw new Error(result.message);
            
            setMessage({ type: 'success', text: result.message });
            setTopics(''); // Clear topics textarea after submission
            if (formMode === 'new') {
                setFormData(prev => ({ ...prev, chapterNumber: '', chapterName: '' }));
            }
            fetchFilteredChapters(); // Always refresh the chapter list
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    if (isPageLoading) {
        return <div className="text-center p-10">Loading form data...</div>;
    }

    return (
        <main className="bg-slate-50 min-h-screen p-4 sm:p-8">
            <div className="w-full max-w-4xl mx-auto space-y-8">
                {/* --- FORM SECTION --- */}
                <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {formMode === 'new' ? 'Add New Chapter' : `Add Topics to Chapter`}
                        </h1>
                        {formMode === 'addTopics' && (
                            <button onClick={handleSetNewChapterMode} className="text-sm bg-gray-200 text-gray-700 font-semibold py-1 px-3 rounded-lg hover:bg-gray-300">
                                &#43; Add New Chapter Instead
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="syllabusTypeId" className="block text-sm font-medium text-gray-700 mb-1">Syllabus</label>
                                <select name="syllabusTypeId" value={formData.syllabusTypeId} onChange={handleChange} required disabled={formMode === 'addTopics'} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed">
                                    <option value="" disabled>Select Syllabus</option>
                                    {syllabuses.map(s => <option key={s.id} value={s.id}>{s.syllabus_name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="classSyllabusId" className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                                <select name="classSyllabusId" value={formData.classSyllabusId} onChange={handleChange} required disabled={formMode === 'addTopics'} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed">
                                    <option value="" disabled>Select Class</option>
                                    {classes.map(c => <option key={c.id} value={c.id}>{c.class_name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <select name="subjectId" value={formData.subjectId} onChange={handleChange} required disabled={formMode === 'addTopics'} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed">
                                    <option value="" disabled>Select Subject</option>
                                    {subjects.map(s => <option key={s.id} value={s.id}>{s.subject_name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                                <label htmlFor="chapterNumber" className="block text-sm font-medium text-gray-700 mb-1">Chapter No.</label>
                                <input type="number" name="chapterNumber" value={formData.chapterNumber} onChange={handleChange} placeholder="e.g., 10" required disabled={formMode === 'addTopics'} className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"/>
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="chapterName" className="block text-sm font-medium text-gray-700 mb-1">Chapter Name</label>
                                <input type="text" name="chapterName" value={formData.chapterName} onChange={handleChange} placeholder="e.g., Light - Reflection" required disabled={formMode === 'addTopics'} className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-1">Topics (one per line)</label>
                            <textarea name="topics" rows="4" value={topics} onChange={(e) => setTopics(e.target.value)} placeholder="Topic 1&#10;Topic 2" required className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                        </div>

                        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                            {formMode === 'new' ? 'Add Chapter & Topics' : 'Add More Topics'}
                        </button>
                    </form>

                    {message.text && <div className={`p-4 mt-4 rounded-md text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{message.text}</div>}
                </div>

                {/* --- DYNAMIC CHAPTER LIST SECTION --- */}
                {formData.subjectId && (
                    <div className="bg-white rounded-xl shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Existing Chapters</h2>
                        {isListLoading ? <p>Loading chapters...</p> : filteredChapters.length > 0 ? (
                            <div className="space-y-3">
                                {filteredChapters.map((chapter) => (
                                    <details key={chapter.id} className="group bg-white rounded-lg border border-gray-200">
                                        <summary className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50">
                                            <span className="font-medium text-gray-700">Ch. {chapter.Chapter_Number}: {chapter.Chapter_Name}</span>
                                            <button type="button" onClick={(e) => { e.preventDefault(); handleSelectChapterForTopics(chapter); }} className="text-xs bg-indigo-100 text-indigo-700 font-semibold py-1 px-3 rounded-full hover:bg-indigo-200 z-10 transition-colors">
                                                Add Topics
                                            </button>
                                        </summary>
                                        <div className="px-4 pb-3 border-t">
                                            {chapter.topics.length > 0 ? (
                                                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                                                    {chapter.topics.map((topic, index) => <li key={index}>{topic}</li>)}
                                                </ul>
                                            ) : <p className="mt-2 text-sm text-gray-500">No topics for this chapter.</p>}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        ) : <p className="text-gray-500">No chapters found for this selection. Add one using the form above!</p>}
                    </div>
                )}
            </div>
        </main>
    );
}