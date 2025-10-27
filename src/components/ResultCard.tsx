import './ResultCard.css';

interface ResultCardProps {
  title: string;
  value: string;
  icon?: string;
  color?: string;
}

const ResultCard = ({ title, value, icon = '📊', color = '#4a90e2' }: ResultCardProps) => {
  return (
    <div className="result-card" style={{ borderTopColor: color }}>
      <div className="result-icon" style={{ color }}>
        {icon}
      </div>
      <h4 className="result-title">{title}</h4>
      <p className="result-value">{value}</p>
    </div>
  );
};

export default ResultCard;

