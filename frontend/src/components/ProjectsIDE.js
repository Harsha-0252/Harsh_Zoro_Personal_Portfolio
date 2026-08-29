import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-markdown";

export default function ProjectsIDE({ projects }) {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const highlighted = useMemo(() => Prism.highlight(project.details, Prism.languages.markdown, "markdown"), [project]);
  const lineCount = project.details.split("\n").length;

  return (
    <div className="ide" data-testid="projects-ide">
      <div className="window-bar"><span></span><span></span><span></span><b>~/harsha/projects — code</b></div>
      <div className="ide-body">
        <aside className="ide-tree" aria-label="Project files">
          <p className="tree-title">EXPLORER</p>
          {projects.map((p, i) => (
            <button key={p.name} data-testid={`ide-file-${i}`} className={i === active ? "tree-file active" : "tree-file"} onClick={() => setActive(i)}>
              <span className={`repo-icon ${p.color}`}>{p.icon}</span> {p.name}.md
            </button>
          ))}
        </aside>
        <div className="ide-editor">
          <div className="editor-tab"><span className="green">{project.name}.md</span><span className="muted">utf-8 · markdown</span></div>
          <AnimatePresence mode="wait">
            <motion.div key={active} className="editor-scroll" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
              <div className="editor-meta">
                <div className="stack">{project.stack.map((t) => <span key={t}>{t}</span>)}</div>
                <p className="editor-blurb">{project.blurb}</p>
                {project.repo && <a className="repo-link" data-testid={`ide-repo-link-${active}`} href={project.repo} target="_blank" rel="noreferrer"><Github size={13}/> {project.repo.replace("https://github.com/", "")}</a>}
              </div>
              <div className="code-wrap">
                <div className="line-numbers" aria-hidden="true">{Array.from({ length: lineCount }, (_, i) => <span key={i}>{i + 1}</span>)}</div>
                <pre data-testid="ide-code-pane"><code dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
