import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

interface Props {
  data: { path: string };
}

const GeneratedLink: React.FC<Props> = ({ data }) => {
  const { origin } = window.location;

  const path = data ? origin + "/messages/" + data.path : "";

  const copyToClipboard = async () => {
    try {
      if (path) {
        await window.navigator.clipboard.writeText(path);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="flex bg-green-100 h-3/5 w-2/3 rounded-xl border-gray-900 border-2 overflow-hidden items-center ml-5">
      <button
        title="copy to clipboard"
        onClick={copyToClipboard}
        className="h-full aspect-square border-r-2 border-green-900 inline-flex justify-center items-center"
      >
        <ClipboardDocumentIcon className="text-gray-700 h-3/5" aria-hidden />
      </button>
      <input
        type="text"
        className="bg-green-100 h-full w-full rounded-r-xl pl-5 text-2xl placeholder:text-3xl placeholder:text-gray-400"
        placeholder="Generate a Link"
        value={path}
        readOnly
      />
    </div>
  );
};

export default GeneratedLink;
