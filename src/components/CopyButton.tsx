// import toast from "react-hot-toast";

const CopyButton = ({
  slug,
  lang,
  className,
  text,
}: {
  slug: string;
  lang: string;
  className: string;
  text: string;
  size?: number;
}) => {

  return (
    <>
    <a
      title="Copy link to clipboard"
      data-slug={slug}
      data-lang={lang}
      id="copyButton"
      className={className}
    >
      {text}
    </a>
    </>
  );
};
export default CopyButton;
