import React, { useState, useEffect } from 'react';
import { getProjectsByUsernameApi, updateProjectStatusApi, getUserByIdApi } from '../../Apis/Api'; // Adjust the import path accordingly

const Project = () => {
    const [box1Items, setBox1Items] = useState([]);
    const [box2Items, setBox2Items] = useState([]);
    const [box3Items, setBox3Items] = useState([]);
    const [box4Items, setBox4Items] = useState([]);
    const [username, setUsername] = useState('');

    // Get userId from localStorage
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await getUserByIdApi(userId);
                console.log('User API response:', response);
                if (response.data && response.data.user) {
                    setUsername(response.data.user.username);
                } else {
                    console.error('Unexpected response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUsername();
    }, [userId]);

    useEffect(() => {
        const fetchProjects = async () => {
            if (username) {
                try {
                    const response = await getProjectsByUsernameApi(username);
                    console.log('Projects API response:', response);
                    if (response.data && response.data.projects) {
                        const projects = response.data.projects;
                        console.log('Fetched projects:', projects);

                        setBox1Items(projects.filter(project => project.status === 'Pending'));
                        setBox2Items(projects.filter(project => project.status === 'In Progress'));
                        setBox3Items(projects.filter(project => project.status === 'Testing'));
                        setBox4Items(projects.filter(project => project.status === 'Completed'));
                    } else {
                        console.error('Unexpected response structure:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching projects:', error);
                }
            }
        };

        fetchProjects();
    }, [username]);

    const handleDragStart = (e, item, sourceBox) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ item, sourceBox }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async (e, targetBox) => {
        e.preventDefault();
        const { item, sourceBox } = JSON.parse(e.dataTransfer.getData('text/plain'));
    
        if (sourceBox !== targetBox) {
            try {
                // Map targetBox to actual status values
                const statusMap = {
                    box1: 'Pending',
                    box2: 'In Progress',
                    box3: 'Testing',
                    box4: 'Completed'
                };
    
                const status = statusMap[targetBox];
                if (!status) {
                    console.error('Invalid target box:', targetBox);
                    return;
                }
    
                // Update project status
                const response = await updateProjectStatusApi(item._id, { status });
                console.log('Update project response:', response);
    
                // Move item to the new box
                const updateItems = (box, setBox) => {
                    if (!box.some(i => i._id === item._id)) {
                        setBox(prevItems => [...prevItems, item]);
                    }
                };
    
                switch (targetBox) {
                    case 'box1':
                        updateItems(box1Items, setBox1Items);
                        break;
                    case 'box2':
                        updateItems(box2Items, setBox2Items);
                        break;
                    case 'box3':
                        updateItems(box3Items, setBox3Items);
                        break;
                    case 'box4':
                        updateItems(box4Items, setBox4Items);
                        break;
                    default:
                        break;
                }
    
                // Remove item from the source box
                const removeItems = (box, setBox) => {
                    setBox(prevItems => prevItems.filter(i => i._id !== item._id));
                };
    
                switch (sourceBox) {
                    case 'box1':
                        removeItems(box1Items, setBox1Items);
                        break;
                    case 'box2':
                        removeItems(box2Items, setBox2Items);
                        break;
                    case 'box3':
                        removeItems(box3Items, setBox3Items);
                        break;
                    case 'box4':
                        removeItems(box4Items, setBox4Items);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error updating project status:', error);
            }
        }
    };
    
    

    return (
        <>
            <div className='text-[#F97316] font-bold text-3xl mt-8 pt-10 mx-5'>All Projects</div>
            <div className='text-gray-600 mx-5'>Project Status</div>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 justify-around p-5 h-full">
                {[
                    { box: 'box1', title: 'Pending', items: box1Items, bgColor: 'bg-orange-300' },
                    { box: 'box2', title: 'In Progress', items: box2Items, bgColor: 'bg-orange-400' },
                    { box: 'box3', title: 'Testing', items: box3Items, bgColor: 'bg-orange-500' },
                    { box: 'box4', title: 'Completed', items: box4Items, bgColor: 'bg-orange-600' },
                ].map(({ box, title, items, bgColor }) => (
                    <div
                        key={box}
                        className="p-4 bg-gray-200 rounded-md h-[80vh] border-orange-300 border-2"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, box)}
                    >
                        <h3 className={`text-lg font-bold mb-2 ${bgColor} p-2 text-white`}>{title}</h3>
                        <h4>{title}: {items.length}</h4>
                        <ul>
                            {items.map((item) => (
                                <li
                                    key={item._id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, item, box)}
                                    className="bg-white p-2 cursor-move border-l-8 border-orange-400 mb-3"
                                >
                                    <div>
                                        <div className='flex gap-4 text-gray-500 font-bold text-2xl items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="size-6">
                                                <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                                                <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                            </svg>
                                            {item.projectname}
                                        </div>
                                        <div className='text-green-500 text-end'>Deadline: {new Date(item.deadline).toLocaleDateString()}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Project;
