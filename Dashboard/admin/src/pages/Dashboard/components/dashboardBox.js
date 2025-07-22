const DashboardBox = ({ gradientClass = "", icon, label, value }) => {
  return (
    <div className={`dashboardBox ${gradientClass}`}>
      <div className="boxContent">
        <div className="icon">{icon}</div>
        <div className="text">
          <div className="label">{label}</div>
          <div className="value">{value}</div>
          <div className="sub">Last Month</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBox;
