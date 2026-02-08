const Badge = ({ text, type = "info" }) => {
  const styles = {
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-blue-100 text-blue-700",
    error: "bg-red-100 text-red-700"
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[type]}`}>
      {text}
    </span>
  );
}; 

export default Badge;