import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: () => <div className="flex h-dvh w-dvw flex-col items-center justify-center text-center">Loading...</div>,
    defaultNotFoundComponent: () => <div className="flex h-dvh w-dvw flex-col items-center justify-center text-center">Not Found</div>,
  });

  return router;
};
