import { createRouter } from '@tanstack/react-router';

import PageLoading from './components/background/PageLoading';
// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: () => <PageLoading />,
    defaultNotFoundComponent: () => <PageLoading />,
  });

  return router;
};
