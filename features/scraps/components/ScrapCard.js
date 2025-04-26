import Image from "next/image"

export const ScrapCard = ({ scrap, onDelete }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-full max-w-sm">
            <img src={scrap.image || "default.jpg"} alt={scrap.title || "default.jpg"} className="w-full h-64 object-cover rounded-t-lg" width={200} height={248} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{scrap.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{scrap.source}</p>
            <a href={scrap.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
            <button className="mt-2 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600" onClick={onDelete}>Remove</button>
        </div>
    )
}