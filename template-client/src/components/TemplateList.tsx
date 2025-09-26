import React, { useEffect, useState } from "react";
import TemplateForm from "./TemplateForm";
import GeneratePdfForm from "./GeneratePDF";
import { Template } from "../types";
import { TemplateService } from "../services/TemplateService";

export const TemplateList: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [editing, setEditing] = useState<Template | null>(null);
  const [pdfTemplate, setPdfTemplate] = useState<Template | null>(null);

  const load = async () => {
    try {
      const res = await TemplateService.getTemplates();
      setTemplates(res);
    } catch {
      alert("Failed to load templates");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete template?")) return;
    await TemplateService.deleteTemplate(id);
    load();
  };

  return (
    <div className="container">
      <h1>Templates</h1>

      <button className="create-btn" onClick={() => setEditing({ id: 0, name: "", htmlContent: "" })}>
        Create new template
      </button>

      {editing && (
        <TemplateForm
          template={editing}
          onSaved={() => {
            setEditing(null);
            load();
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      {pdfTemplate && (
        <GeneratePdfForm
          template={pdfTemplate}
          onClose={() => setPdfTemplate(null)}
        />
      )}

      <div className="grid">
        {templates.map((t) => (
          <div key={t.id} className="tile">
            <div className="tile-content">
              <b>{t.name}</b>
              <div dangerouslySetInnerHTML={{ __html: t.htmlContent }} />
            </div>
            <div className="tile-buttons">
              <button onClick={() => setEditing(t)}>Edit</button>
              <button onClick={() => setPdfTemplate(t)}>PDF</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};