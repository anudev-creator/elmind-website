// app/add-chapter/page.jsx
'use client'; // This is a Client Component

import { useState, useEffect } from 'react';

export default function AddChapterPage() {
    // State for dropdown data
    const [syllabuses, setSyllabuses] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);

    // State for form inputs
    const [formData, setFormData] = useState({
        syllabusTypeId: '',
        classSyllabusId: '',
        subjectId: '',
        chapterNumber: '',
        chapterName: '',
    });
    const [topics, setTopics] = useState(''); // Topics will be a string in a textarea

    // State for loading and feedback messages
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Fetch initial data for all dropdowns when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all data in parallel for better performance
                const [syllabusRes, classRes, subjectRes] = await Promise.all([
                    fetch('http://192.168.1.34:3221/DailyUpdate/syllabustypes'),
                    fetch('http://192.168.1.34:3221/DailyUpdate/classes'),
                    fetch('http://192.168.1.34:3221/DailyUpdate/subjects')
                ]);

                setSyllabuses(await syllabusRes.json());
                setClasses(await classRes.json());
                setSubjects(await subjectRes.json());
            } catch (error) {
                setMessage({ type: 'error', text: 'Failed to load initial data. Please check the API connection.' });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this runs once on mount

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        // Split the topics string into an array, filtering out empty lines
        const topicsArray = topics.split('\n').filter(topic => topic.trim() !== '');

        if (topicsArray.length === 0) {
            setMessage({ type: 'error', text: 'Please enter at least one topic.' });
            return;
        }

        const submissionData = { ...formData, topics: topicsArray };
        
        try {
            const response = await fetch('http://localhost:4000/api/add-chapter-with-topics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.message);
            
            setMessage({ type: 'success', text: result.message });
            // Reset form
            setFormData({ syllabusTypeId: '', classSyllabusId: '', subjectId: '', chapterNumber: '', chapterName: '' });
            setTopics('');
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'An unknown error occurred.' });
        }
    };

    if (isLoading) {
        return <div className="text-center p-10">Loading form data...</div>;
    }

    return (
        <main className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">Add New Chapter & Topics</h1>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Syllabus Dropdown */}
                        <div>
                            <label htmlFor="syllabusTypeId" className="block text-sm font-medium text-gray-700 mb-1">Syllabus</label>
                            <select name="syllabusTypeId" value={formData.syllabusTypeId} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="" disabled>Select Syllabus</option>
                                {syllabuses.map(s => <option key={s.id} value={s.id}>{s.syllabus_name}</option>)}
                            </select>
                        </div>
                        {/* Class Dropdown */}
                        <div>
                            <label htmlFor="classSyllabusId" className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                            <select name="classSyllabusId" value={formData.classSyllabusId} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="" disabled>Select Class</option>
                                {classes.map(c => <option key={c.id} value={c.id}>{c.class_name}</option>)}
                            </select>
                        </div>
                        {/* Subject Dropdown */}
                        <div>
                            <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <select name="subjectId" value={formData.subjectId} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="" disabled>Select Subject</option>
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.subject_name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Chapter Number */}
                        <div className="md:col-span-1">
                            <label htmlFor="chapterNumber" className="block text-sm font-medium text-gray-700 mb-1">Chapter Number</label>
                            <input type="number" name="chapterNumber" value={formData.chapterNumber} onChange={handleChange} placeholder="e.g., 10" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        {/* Chapter Name */}
                        <div className="md:col-span-2">
                            <label htmlFor="chapterName" className="block text-sm font-medium text-gray-700 mb-1">Chapter Name</label>
                            <input type="text" name="chapterName" value={formData.chapterName} onChange={handleChange} placeholder="e.g., Light - Reflection and Refraction" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                    </div>
                    
                    {/* Topics Textarea */}
                    <div>
                        <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-1">Topics (one topic per line)</label>
                        <textarea name="topics" rows="5" value={topics} onChange={(e) => setTopics(e.target.value)} placeholder="Topic 1&#10;Topic 2&#10;Topic 3" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                    
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                        Add Chapter and Topics
                    </button>
                </form>

                {message.text && (
                    <div className={`p-4 mt-4 rounded-md text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message.text}
                    </div>
                )}
            </div>
        </main>
    );
}