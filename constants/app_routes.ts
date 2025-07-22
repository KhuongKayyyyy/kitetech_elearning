export const appRoutes = {
  home: "/",
  login: "/login",
  register: "/register",
  courses: "/courses",
  courseDetails: (id: string) => `/courses/${id}`,
  profile: "/profile",
  settings: "/settings",
  
};
