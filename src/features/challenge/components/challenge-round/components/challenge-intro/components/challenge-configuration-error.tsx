type ChallengeConfigurationErrorProps = { message: string };

export function ChallengeConfigurationError({ message }: ChallengeConfigurationErrorProps) {
  return <p className="configuration-error">{message}</p>;
}
