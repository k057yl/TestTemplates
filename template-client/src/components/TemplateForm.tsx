import React, { useState } from "react";
import { Template } from "../types";
import { TemplateService } from "../services/TemplateService";
import "../index.css";

interface Props {
  template: Template;
  onSaved: () => void;
  onCancel: () => void;
}

const TemplateForm: React.FC<Props> = ({ template, onSaved, onCancel }) => {
  const [name, setName] = useState(template.name);
  const [html, setHtml] = useState(template.htmlContent);

  const handleSubmit = async () => {
    if (template.id === 0) {
      await TemplateService.createTemplate({ name, htmlContent: html });
    } else {
      await TemplateService.updateTemplate(template.id, { name, htmlContent: html });
    }
    onSaved();
  };

  return (
  <div className="modal-overlay">
    <div className="form-container">
      <h3>{template.id === 0 ? "Create" : "Edit"} template</h3>

      <div className="form-field">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
      </div>

      <div className="form-field">
        <label>Content</label>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="Enter content"
          rows={6}
        />
      </div>

      <div className="form-buttons">
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </div>
);
};

export default TemplateForm;