import { useContext } from "react";
import { SalaryHistoryContext } from "../context/SalaryHistoryContext";

const HistoryLogs = () => {
  const { salaryHistory } = useContext(SalaryHistoryContext);

  const groupedSalaryHistory = salaryHistory.reduce((acc, entry) => {
    const key = `${entry.month}-${entry.year}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(entry);
    return acc;
  }, {});

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold my-4">Salary History Logs</h1>

      {Object.keys(groupedSalaryHistory).map((key) => {
        const [month, year] = key.split("-");
        const entries = groupedSalaryHistory[key];
        return (
          <div key={key} className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              Salary History for {month}/{year}
            </h2>

            <table className="min-w-full bg-white">
              <thead className="bg-[#F72717] text-white">
                <tr>
                  <th className="px-4 py-2 border">Staff ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Total Salary</th>
                  <th className="px-4 py-2 border">End-of-Service</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{entry.staffId}</td>
                    <td className="px-4 py-2 border">{entry.name}</td>
                    <td className="px-4 py-2 border">{entry.totalSalary}</td>
                    <td className="px-4 py-2 border">
                      {entry.isGratuity ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}

      {salaryHistory.length === 0 && (
        <p className="text-center">No salary history available.</p>
      )}
    </div>
  );
};

export default HistoryLogs;
