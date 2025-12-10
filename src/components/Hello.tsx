type HelloProps = {
  name: string;
};

export default function Hello({ name }: HelloProps) {
  return (
    <div className="p-4 bg-blue-500 text-white rounded-lg">
      Hello, {name} 👋
    </div>
  );
}
