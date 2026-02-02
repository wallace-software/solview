type HeadingProps = {
  header: string;
  subheader?: string;
};
export function Heading({ header, subheader = "" }: HeadingProps) {
  return (
    <div className="flex flex-col md:items-center gap-2">
      <h1>{header}</h1>
      <p className="text-white/90">{subheader}</p>
    </div>
  );
}
