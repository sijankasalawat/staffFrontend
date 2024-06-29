import React, { useState } from 'react';

const Project = () => {
    const [box1Items, setBox1Items] = useState([
        { id: 1, text: 'Project 1', Deadline: "2024/12/31" },
        { id: 2, text: 'Project 2', Deadline: "2024/8/31" },
        { id: 3, text: 'Project 3', Deadline: "2024/9/31" },
    ]);
    const [box2Items, setBox2Items] = useState([]);
    const [box3Items, setBox3Items] = useState([]);
    const [box4Items, setBox4Items] = useState([]);

    const handleDragStart = (e, item, sourceBox) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ item, sourceBox }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetBox) => {
        e.preventDefault();
        const { item, sourceBox } = JSON.parse(e.dataTransfer.getData('text/plain'));

        // Check if the dropped item is coming from the same box
        if (sourceBox !== targetBox) {
            switch (targetBox) {
                case 'box1':
                    if (!box1Items.some((i) => i.id === item.id)) {
                        setBox1Items((prevItems) => [...prevItems, item]);
                    }
                    break;
                case 'box2':
                    if (!box2Items.some((i) => i.id === item.id)) {
                        setBox2Items((prevItems) => [...prevItems, item]);
                    }
                    break;
                case 'box3':
                    if (!box3Items.some((i) => i.id === item.id)) {
                        setBox3Items((prevItems) => [...prevItems, item]);
                    }
                    break;
                case 'box4':
                    if (!box4Items.some((i) => i.id === item.id)) {
                        setBox4Items((prevItems) => [...prevItems, item]);
                    }
                    break;
                default:
                    break;
            }

            // Remove the item from the source box
            switch (sourceBox) {
                case 'box1':
                    setBox1Items((prevItems) => prevItems.filter((i) => i.id !== item.id));
                    break;
                case 'box2':
                    setBox2Items((prevItems) => prevItems.filter((i) => i.id !== item.id));
                    break;
                case 'box3':
                    setBox3Items((prevItems) => prevItems.filter((i) => i.id !== item.id));
                    break;
                case 'box4':
                    setBox4Items((prevItems) => prevItems.filter((i) => i.id !== item.id));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <>
            <div className='text-[#F97316] font-bold text-3xl  mt-8 pt-10 mx-5'>All Project</div>
            <div className='text-gray-600 mx-5'>Project Status</div>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 justify-around p-5 h-full">

                <div
                    className="p-4 bg-gray-200 rounded-md h-[80vh]"
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, 'box1')}
                >
                    <h3 className="text-lg font-bold mb-2 bg-orange-300 p-2 text-white">Pending</h3>
                    <h4>Pending: {box1Items.length}</h4>
                    <ul>
                        {box1Items.map((item) => (
                            <li
                                key={item.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item, 'box1')}
                                className="bg-white p-2 cursor-move border-l-8 border-orange-400 mb-3"

                            >
                                <div>
                                    <div className='flex gap-4 text-gray-500 font-bold text-2xl items-center '>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" class="size-6">
                                            <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                                            <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                                        </svg>

                                        {item.text}
                                    </div>
                                    <div className='text-green-500 text-end'>DeadLine: {item.Deadline}</div>

                                </div>

                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    className="p-4 bg-gray-200 rounded-md"
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, 'box2')}
                >
                    <h3 className="text-lg font-bold mb-2 bg-orange-400 text-white p-2">In Progress</h3>
                    <h4>In Progress: {box2Items.length}</h4>
                    <ul>
                        {box2Items.map((item) => (
                            <li
                                key={item.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item, 'box2')}
                                className="bg-white p-2 mb-3  cursor-move border-l-8 border-orange-400  "
                            >

                                <div>
                                    <div className='flex gap-4 text-gray-500 font-bold text-2xl items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" class="size-6">
                                            <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                                            <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                                        </svg>

                                        {item.text}
                                    </div>
                                    <div className='text-green-500 text-end'>DeadLine: {item.Deadline}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    className="p-4 bg-gray-200 rounded-md"
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, 'box3')}
                >
                    <h3 className="text-lg font-bold mb-2 bg-orange-500 text-white p-2">Testing</h3>
                    <h4>Testing: {box3Items.length}</h4>
                    <ul>
                        {box3Items.map((item) => (
                            <li
                                key={item.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item, 'box3')}
                                className="bg-white p-2 mb-3 border-l-8 border-orange-400   cursor-move"
                            >

                                <div>
                                    <div className='flex gap-4 text-gray-500 font-bold text-2xl items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" class="size-6">
                                            <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                                            <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                                        </svg>

                                        {item.text}
                                    </div>
                                    <div className='text-green-500 text-end'>DeadLine: {item.Deadline}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    className="p-4 bg-gray-200 rounded-md"
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, 'box4')}
                >
                    <h3 className="text-lg font-bold mb-2 bg-orange-600 text-white p-2">Completed</h3>
                    <h4>Completed: {box4Items.length}</h4>
                    <ul>
                        {box4Items.map((item) => (
                            <li
                                key={item.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item, 'box4')}
                                className="bg-white p-2 mb-3 border-l-8 border-orange-400   cursor-move"
                            >

                                <div>
                                    <div className='flex gap-4 text-gray-500 font-bold text-2xl items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" class="size-6">
                                            <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                                            <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                                        </svg>

                                        {item.text}
                                    </div>
                                    <div className='text-green-500 text-end'>DeadLine: {item.Deadline}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Project;
