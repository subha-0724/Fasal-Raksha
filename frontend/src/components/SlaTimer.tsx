
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Alert } from "@/components/ui";

interface SlaTimerProps {
  startedAt: string;
  hours?: number;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function calculateRemaining(
  startedAt: string,
  allowedHours: number
): TimeRemaining {
  const startTime = new Date(startedAt).getTime();

  if (Number.isNaN(startTime)) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  const deadline =
    startTime + allowedHours * 60 * 60 * 1000;

  const difference = deadline - Date.now();

  if (difference <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  const totalSeconds = Math.floor(difference / 1000);

  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: false,
  };
}

export default function SlaTimer({
  startedAt,
  hours = 72,
}: SlaTimerProps) {
  const [remaining, setRemaining] = useState(() =>
    calculateRemaining(startedAt, hours)
  );

  useEffect(() => {
    const updateTimer = () => {
      setRemaining(calculateRemaining(startedAt, hours));
    };

    updateTimer();

    const interval = window.setInterval(
      updateTimer,
      1000
    );

    return () => window.clearInterval(interval);
  }, [startedAt, hours]);

  const format = (value: number) =>
    String(value).padStart(2, "0");

  if (remaining.expired) {
    return (
      <Alert variant="danger">
        The 72-hour reporting window has expired.
        Please contact your Agriculture Officer for guidance.
      </Alert>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-5 w-5 text-primary" />

        <span className="font-medium text-sm">
          Reporting Window
        </span>
      </div>

      <div className="flex items-center gap-2">
        {[
          remaining.hours,
          remaining.minutes,
          remaining.seconds,
        ].map((value, index) => (
          <div key={index} className="text-center">
            <div className="rounded-md bg-primary/10 px-3 py-2 text-xl font-bold tabular-nums text-primary">
              {format(value)}
            </div>

            <span className="text-xs text-muted">
              {["Hours", "Minutes", "Seconds"][index]}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted mt-3">
        Time remaining in the configured 72-hour window.
        Confirm the applicable deadline with your insurance provider.
      </p>
    </div>
  );
}
