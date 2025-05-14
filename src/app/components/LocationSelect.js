export default function LocationSelect({
  selectedLocation,
  setSelectedLocation,
}) {
  return (
    <select
      value={selectedLocation}
      onChange={(e) => setSelectedLocation(e.target.value)}
      className="mb-6 p-2 shadow-md shadow-gray-600 rounded-lg bg-white text-indigo-800 font-bold"
    >
      <option value="">Select a city</option>
      <option value="London">London</option>
      <option value="New York">New York</option>
      <option value="Bucharest">Bucharest</option>
      <option value="Tokyo">Tokyo</option>
      <option value="Sydney">Sydney</option>
      <option value="Vilnius">Vilnius</option>
      <option value="Glasgow">Glasgow</option>
    </select>
  );
}
