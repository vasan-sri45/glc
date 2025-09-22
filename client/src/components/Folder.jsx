import React from 'react'
import FolderView from './elements/folder/FolderView'
import Folders from './elements/folder/Folders'
import { Helmet } from 'react-helmet';

const Folder = () => {
   const pageTitle = 'Folders • Employee Suite';
  const pageDesc = 'Browse and manage project folders and documents.';

  return (
     <div className="max-w-7xl mx-auto px-4 py-6">
        <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
      </Helmet>
      {/* <Folders />        */}
      <FolderView />   {/* renders the list with icons and titles */}
    </div>
  )
}

export default Folder
