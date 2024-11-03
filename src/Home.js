// src/App.js
import React, { useState, useEffect } from 'react';
import { parseLuaFile } from './utils/parseLua'; // Assuming this function is defined elsewhere
import FunctionDoc from './components/FunctionDoc'; // Ensure these components are implemented
import VariableDoc from './components/VariableDoc';
import TableDoc from './components/TableDoc';
import HighlightedCodeBlock from './components/highlight';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import Navbar from './NavBar';
import TaskList from './TaskList';

const BATCH_SIZE = 30; // Adjust this size based on testing

function Home() {
  const [docData, setDocData] = useState([]); // Holds all parsed Lua data
  const [luaFiles, setLuaFiles] = useState([]); // Original Lua file paths
  const [loadingIndex, setLoadingIndex] = useState(0); // Track the current loading index
  const [fileStructure, setFileStructure] = useState({}); // To hold folder structure
  const [selectedFiles, setSelectedFiles] = useState([]); // To hold files of the selected folder
  const [selectedFileData, setSelectedFileData] = useState(null); // To hold data of the selected file
  const [currentPath, setCurrentPath] = useState(''); // State for the current path
  const [search, setSearch] = useState(''); // State to hold the search query
  const [value, setValue] = useState(''); // State to hold the search query //TODO: change name 

  useEffect(() => {
    const loadLuaFiles = async () => {
      try {
        // Fetch the JSON file containing the Lua file paths
        const response = await fetch('/lua_files.json');
        if (!response.ok) throw new Error(`Failed to load ${response.url}`)
        // Use the JSON array directly
        const luaFiles = await response.json()
        setLuaFiles(luaFiles)
        // Generate folder structure
        const folderStructure = generateFolderStructure(luaFiles)
        setFileStructure(folderStructure);
      } catch (error) {
        console.error("Error loading Lua files:", error)
      }
    }
    loadLuaFiles();
  }, []);

  useEffect(() => {
    if (selectedFiles.length > 0) {
      const filteredFiles = selectedFiles.filter(file => 
        file.filename.toLowerCase().includes(value.toLowerCase())
      );
      setSearch(filteredFiles)
    }
  }, [selectedFiles, value]); // Runs whenever `selectedFiles` changes

  const generateFolderStructure = (files) => {
    const structure = {};
    files.forEach(file => {
      const parts = file.split('/');
      parts.reduce((acc, part, index) => {
        if (index === parts.length - 1) {
          return; // Skip the file name in folder structure
        }
        if (!acc[part]) {
          acc[part] = {};
        }
        return acc[part];
      }, structure);
    });
    return structure;
  };

  /*const handleFolderClick = (folderPath) => {
    const filesInFolder = luaFiles.filter(file => file.startsWith(folderPath));

    const response = await fetch(filePath);
    const text = await response.text();
    const parsedData = parseLuaFile(text);

    setSelectedFiles(filesInFolder);
  };*/

  /*const handleFolderClick = async (folderPath) => {
    const filesInFolder = luaFiles.filter(file => file.startsWith(folderPath));
    let batchedFiles = [];
    let wierd = false
    // Split files into manageable batches
    for (let i = 0; i < filesInFolder.length; i += BATCH_SIZE) {
      const batch = filesInFolder.slice(i, i + BATCH_SIZE);
      const fileSummaries = await Promise.all(
        batch.map(async (filePath) => {
          const response = await fetch(filePath);
          const text = await response.text();
          const parsedData = parseLuaFile(text);
          if(filePath=="scripts/nis/xbnyn.lua")
          {
            wierd = true
          }
          return {
            filename: filePath,
            folderPath: filePath.substring(0, filePath.lastIndexOf('/')),
            F: parsedData.functions?.items?.length || 0,
            V: parsedData.variables?.items?.length || 0,
            T: parsedData.tables?.items?.length || 0,
            data: parsedData,
            wierdFileBro: wierd
          };
        })
      );
      batchedFiles = [...batchedFiles, ...fileSummaries];
      setSelectedFiles(batchedFiles); // Update state incrementally
    }
  };*/

  const handleFolderClick = async (folderPath) => {
    const filesInFolder = luaFiles.filter(file => file.startsWith(folderPath));
    let batchedFiles = [];
    
    // Update the current path whenever a folder is clicked
    setCurrentPath(folderPath);

    // Split files into manageable batches
    for (let i = 0; i < filesInFolder.length; i += BATCH_SIZE) {
      const batch = filesInFolder.slice(i, i + BATCH_SIZE);
      let wierd = false
      const fileSummaries = await Promise.all(
        batch.map(async (filePath) => {
          const response = await fetch(filePath);
          const text = await response.text();
          const parsedData = parseLuaFile(text);
          if(filePath=="scripts/nis/xbnyn.lua")
          {
            wierd = true
          }
          return {
            filename: filePath,
            folderPath: filePath.substring(0, filePath.lastIndexOf('/')),
            F: parsedData.functions?.items?.length || 0,
            V: parsedData.variables?.items?.length || 0,
            T: parsedData.tables?.items?.length || 0,
            data: parsedData,
            wierdFileBro: wierd,
          };
        })
      );
      batchedFiles = [...batchedFiles, ...fileSummaries];
      setSelectedFiles(batchedFiles); // Update state incrementally
      //setSearch(filteredFiles)
    }
  };

  /*const handleFolderClick = async (folderPath) => {
    const filesInFolder = luaFiles.filter(file => file.startsWith(folderPath));
    
    // Map each file to a fetch-and-parse operation
    const fileSummaries = await Promise.all(
      filesInFolder.map(async (filePath) => {

        let wierd = false

        console.log(filePath)
        let parsedData= {}
        const response = await fetch(filePath);
        const text = await response.text();
        parsedData = parseLuaFile(text);
        if(filePath=="scripts/nis/xbnyn.lua")
        {
          wierd = true
        }
        let f = 0; if(parsedData.functions != null && parsedData.functions.items != null) f = parsedData.functions.items.length
        let v = 0; if(parsedData.variables != null && parsedData.variables.items != null) v = parsedData.variables.items.length
        let t = 0; if(parsedData.tables != null && parsedData.tables.items != null) t = parsedData.tables.items.length
        const folderPath = filePath.substring(0, filePath.lastIndexOf('/')); // Get the folder path
        return {
          filename: filePath,
          folderPath: folderPath,
          F: f,
          V: v,
          T: t,
          data: parsedData,
          wierdFileBro: wierd
        };
      })
    );
  
    // Update selectedFiles state with summaries for each file
    setSelectedFiles(fileSummaries);
  };*/

  const handleFileClick = async (filePath) => {
    setSelectedFileData(null); // Clear previous file data
    const item = selectedFiles.find(item => item.filename === filePath);
    setSelectedFileData({
      folderPath: item.folderPath,
      fileName: item.filename.split('/').pop().split('.')[0],
      data: item.data,
    });
  };

  //functions/variables/tables
  /*const toggleSection = (section) => {
    setSelectedFileData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [section]: {
          ...prev.data[section],
          isOpen: !prev.data[section].isOpen,
        },
      },
    }));
    if(section=='functions')
    {
      setSelectedFileData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          ['variables']: {
            ...prev.data['variables'],
            isOpen: false,
          },
        },
      }));
      setSelectedFileData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          ['tables']: {
            ...prev.data['tables'],
            isOpen: false,
          },
        },
      }));
      setSelectedFileData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          ['code']: {
            ...prev.data['code'],
            isOpen: false,
          },
        },
      }));
    }
    else if(section=='variables')
    {
      setSelectedFileData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          ['functions']: {
            ...prev.data['functions'],
            isOpen: false,
          },
        },
      }));
      setSelectedFileData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          ['tables']: {
            ...prev.data['tables'],
            isOpen: false,
          },
        },
      }));
      setSelectedFileData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          ['code']: {
            ...prev.data['code'],
            isOpen: false,
          },
        },
      }));
    }
    else if(section=='tables')
    {
      setSelectedFileData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          ['functions']: {
            ...prev.data['functions'],
            isOpen: false,
          },
        },
      }));
      setSelectedFileData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          ['variables']: {
            ...prev.data['variables'],
            isOpen: false,
          },
        },
      }));
      setSelectedFileData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          ['code']: {
            ...prev.data['code'],
            isOpen: false,
          },
        },
      }));
    }
    else if(section=='code')
    {
      setSelectedFileData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          ['functions']: {
            ...prev.data['functions'],
            isOpen: false,
          },
        },
      }));
      setSelectedFileData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          ['variables']: {
            ...prev.data['variables'],
            isOpen: false,
          },
        },
      }));
      setSelectedFileData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          ['tables']: {
            ...prev.data['tables'],
            isOpen: false,
          },
        },
      }));
    }
  };*/

  const toggleSection = (section) => {
    setSelectedFileData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [section]: {
          ...prev.data[section],
          isOpen: !prev.data[section].isOpen,
        },
        ...['functions', 'variables', 'tables', 'code']
          .filter(sec => sec !== section)
          .reduce((acc, sec) => ({
            ...acc,
            [sec]: {
              ...prev.data[sec],
              isOpen: false,
            },
          }), {})
      },
    }));
  };

  /*const renderFileStructure = (structure, path = '') => {
    return Object.keys(structure).map((key) => {
      const fullPath = `${path}${key}/`; // Construct the full path for folder click
      return (
        <div key={fullPath}>
          <strong onClick={() => handleFolderClick(fullPath)} style={{ cursor: 'pointer', fontSize: '15px' }}>{key}</strong>
          <div style={{ paddingLeft: '25px' }}>
            {typeof structure[key] === 'object' && renderFileStructure(structure[key], fullPath)}
          </div>
        </div>
      );
    });
  };*/

  const renderFileStructure = (structure, path = '') => {
    return Object.keys(structure).map((key) => {
      const fullPath = `${path}${key}/`; // Construct the full path for folder click
      return (
        <div key={fullPath}>
          <strong onClick={() => handleFolderClick(fullPath)} style={{ cursor: 'pointer', fontSize: '15px' }}>{key}</strong>
          <div style={{ paddingLeft: '25px' }}>
            {typeof structure[key] === 'object' && renderFileStructure(structure[key], fullPath)}
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ display: 'flex' }}>
        <TaskList></TaskList>
    </div>
  );
}

export default Home;