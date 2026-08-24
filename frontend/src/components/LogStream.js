const LINES = [
  "[09:41:02] INFO  epmmserver: hotfix 10.4.0.2 deployed to rpm repo",
  "[09:41:37] DEBUG graph-sync: managed-app visibility restored",
  "[09:42:11] INFO  batch-processor: ios device association unblocked",
  "[09:43:58] WARN  sev-2 incident acknowledged — enterprise tenant",
  "[09:44:20] INFO  sql-analysis: incident resolved across distributed infra",
  "[09:45:03] DEBUG owasp-scan: 0 critical findings post-patch",
  "[09:46:47] INFO  jenkins: build #482 green in 4m 12s",
  "[09:47:19] INFO  ldm-training: epoch 11 complete — IS 6.64 ± 0.45",
  "[09:48:55] DEBUG rpm-backport: vulnerability patch signed + shipped",
  "[09:49:31] INFO  log-analysis: bug backlog reduced 18% quarter-over-quarter",
];

export default function LogStream() {
  return (
    <div className="log-stream" aria-hidden="true">
      <div className="log-track">
        {[...LINES, ...LINES].map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </div>
  );
}
