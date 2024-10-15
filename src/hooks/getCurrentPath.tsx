import { useNavigationState } from '@react-navigation/native';

export default function getCurrentPath() {
  const state = useNavigationState(state => state);
  const currentRoute = state.routes[state.index];
  const path = `current path: ${currentRoute.name}`;

  return path;
}