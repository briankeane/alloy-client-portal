import { useNavigate } from 'react-router-dom';

const PATHS: Record<string, string> = {
  dashboard: '/portal',
  roi: '/portal/roi',
  projects: '/portal/projects',
  tickets: '/portal/tickets',
  playbook: '/portal/playbook',
  library: '/portal/library',
  rewards: '/portal/rewards',
};

export function pathForScreen(id: string): string | undefined {
  return PATHS[id];
}

export function useAlloyNav() {
  const navigate = useNavigate();
  return (id: string) => {
    const p = PATHS[id];
    if (p) navigate(p);
  };
}
