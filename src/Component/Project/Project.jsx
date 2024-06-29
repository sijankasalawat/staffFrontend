import React, { useState } from 'react';

const Project = () => {
  const [box1Items, setBox1Items] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
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
      <div className='text-[#F97316] font-bold text-3xl'>All Project</div>
      <div className='text-gray-600'>Project Status</div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 justify-around mt-8 pt-10 p-5 h-full">

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
                className="bg-white p-2 mb-1 rounded-md cursor-move"
              >
                {item.text}
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
                className="bg-white p-2 mb-1 rounded-md cursor-move"
              >
                {item.text}
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
                className="bg-white p-2 mb-1 rounded-md cursor-move"
              >
                {item.text}
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
                className="bg-white p-2 mb-1 rounded-md cursor-move"
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Project;
