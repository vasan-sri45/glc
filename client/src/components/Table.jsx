import React from 'react';
import TabContainer from './elements/table/TabContainer';
import { Helmet } from 'react-helmet';

const Table = () => {
  const pageTitle = 'Tables • Employee Suite';
  const pageDesc = 'View and manage tabular data for employees, tasks, and performance.';

  return (
    <main className="py-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
      </Helmet>
      <TabContainer />
    </main>
  );
}

export default Table;
