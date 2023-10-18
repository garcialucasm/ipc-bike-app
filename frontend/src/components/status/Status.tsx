function Status() {
  var inUse = true;

  const decorationIsAvailable = { color: "gray" };

  return <div style={inUse && decorationIsAvailable}>Bike X</div>;
}

export default Status;
