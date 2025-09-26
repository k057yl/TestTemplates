import React, { useState, useEffect } from "react";
import { Template } from "../types";
import { TemplateService } from "../services/TemplateService";

interface Props {
  template: Template;
  onClose: () => void;
}

const GeneratePdfForm: React.FC<Props> = ({ template, onClose }) => {
  const [fields, setFields] = useState<Record<string, string>>({});

  useEffect(() => {
    const rx = /\{\{\s*(\w+)\s*\}\}/g;
    const placeholders = new Set<string>();
    let match;
    while ((match = rx.exec(template.htmlContent)) !== null) {
      placeholders.add(match[1]);
    }
    const initial: Record<string, string> = {};
    placeholders.forEach(ph => (initial[ph] = ""));
    setFields(initial);
  }, [template]);

  const handleChange = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    try {
      const blob = await TemplateService.generatePdf(template.id, fields);
      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `${template.name}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Generation error PDF");
    }
  };

  return (
  <div className="modal-overlay">
    <div className="form-container">
      <h3>Generate PDF from {template.name}</h3>
      {Object.keys(fields).map((key) => (
        <div key={key} className="form-field">
          <label htmlFor={key}>{key}:</label>
          <input
            id={key}
            type="text"
            value={fields[key]}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </div>
      ))}
      <div className="form-buttons">
        <button onClick={handleGenerate}>Generate PDF</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
);
};

export default GeneratePdfForm;