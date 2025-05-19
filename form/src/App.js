import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ name: "", email: "", skills: [] });
  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors] = useState({});
  const skillSet = ["HTML", "CSS", "JAVA", "NodeJS"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter((skill) => skill !== value),
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim() || !formData.email.includes("@"))
      errs.email = "Valid email is required";
    if (formData.skills.length === 0) errs.skills = "Select at least one skill";
    return errs; // <-- Must return the errors object here!
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmittedData((prev) => [...prev, formData]);
    setFormData({ name: "", email: "", skills: [] }); // Reset form
  };

  return (
    <>
      <h2>User Input Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p style={{ color: "red", margin: "5px 0" }}>{errors.name}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p style={{ color: "red", margin: "5px 0" }}>{errors.email}</p>
          )}
        </div>
        <div>
          <label>Select Skills:</label>
          <div>
            {skillSet.map((skill) => (
              <label key={skill} style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleCheckboxChange}
                />
                {skill}
              </label>
            ))}
          </div>
          {errors.skills && (
            <p style={{ color: "red", margin: "5px 0" }}>{errors.skills}</p>
          )}
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Submit
        </button>
      </form>

      <div className="submitted-data">
        <h2>Submitted Details of Users</h2>
        {submittedData.map((data, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Skills:</strong> {data.skills.join(", ") || "None"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
