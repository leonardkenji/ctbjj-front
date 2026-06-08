import { useCurrentStudent } from "../hooks/useStudents";


export function StudentDashboardPage() {
  const { data } = useCurrentStudent();

  if (!data) return <div>Loading...</div>

  return <div className="p-12"><p>{data.name}</p></div>

}
