import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'course/:id/watch',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return all course IDs for prerendering
      return Promise.resolve([
        { id: 'math-101' },
        { id: 'physics-201' },
        { id: 'chem-101' },
        { id: 'math-201' },
        { id: 'physics-101' },
        { id: 'chem-201' }
      ]);
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
