import os
import subprocess
from datetime import datetime, timedelta
import random

"""boost_activity

Utility script to record and backdate contribution activity if desired.
"""


def _run_cmd(cmd):
    """Run a shell command and return CompletedProcess."""
    return subprocess.run(cmd, capture_output=True, text=True)


def _generate_dates(total_commits, days_back):
    """Generate a sorted list of backdated timestamps.

    Returns a list of strings formatted as "%Y-%m-%d %H:%M:%S".
    """
    start_date = datetime.now() - timedelta(days=days_back)
    dates = []
    for _ in range(total_commits):
        random_days = random.randint(0, days_back)
        random_seconds = random.randint(0, 86400)
        d = start_date + timedelta(days=random_days, seconds=random_seconds)
        dates.append(d.strftime("%Y-%m-%d %H:%M:%S"))
    dates.sort()
    return dates


def boost_activity(total_commits=1000, days_back=365, dry_run=False):
    """Generate backdated commits and append entries to activity_log.txt."""
    print(f"🚀 Activity Generator: Preparing {total_commits} commits across the last {days_back} days...")

    dates = _generate_dates(total_commits, days_back)
    log_file = "activity_log.txt"

    for idx, date_str in enumerate(dates, 1):
        log_line = f"Activity entry #{idx} on {date_str}\n"
        if dry_run:
            print(f"[Dry Run] {log_line.strip()}")
            continue

        with open(log_file, "a", encoding="utf-8") as f:
            f.write(log_line)

        _run_cmd(["git", "add", log_file])
        env = os.environ.copy()
        env["GIT_AUTHOR_DATE"] = date_str
        env["GIT_COMMITTER_DATE"] = date_str
        subprocess.run(["git", "commit", "-m", f"chore: activity update #{idx}"], env=env, capture_output=True)

        if idx % 100 == 0 or idx == total_commits:
            print(f"✅ Committed {idx}/{total_commits} entries...")

    print("🎉 All activity entries generated successfully!")


if __name__ == "__main__":
    # Change dry_run=False to execute real commits
    boost_activity(total_commits=10, days_back=30, dry_run=True)
