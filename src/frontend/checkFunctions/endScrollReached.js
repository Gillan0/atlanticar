export default function endScrollReached({layoutMeasurement, contentOffset, contentSize}) {
  const paddingToBottom = 10;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};