const TaskListLoading = () => {
  const nums = [0, 1, 2, 3, 4, 5]
  return (
    <>
      {nums.map((num, index) => (
        <div key={index} className="w-full h-[198px] bg-gray-200 animate-pulse rounded-lg" />
      ))}
    </>
  )
}

export default TaskListLoading