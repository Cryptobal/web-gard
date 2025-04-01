import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({ 
  currentPage, 
  totalPages,
  basePath = '/blog'
}: PaginationProps) {
  // No mostrar paginación si solo hay una página
  if (totalPages <= 1) {
    return null;
  }

  // Generar la URL correcta según la página
  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath;
    }
    return `${basePath}/page/${page}`;
  };

  // Renderizar enlaces a páginas específicas
  const renderPageLinks = () => {
    const links = [];
    // Mostrar siempre la primera página
    links.push(
      <Link
        key="page-1"
        href={getPageUrl(1)}
        className={`px-4 py-2 mx-1 rounded-lg ${
          currentPage === 1
            ? 'bg-primary text-white font-bold'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        1
      </Link>
    );

    // Lógica para mostrar puntos suspensivos y páginas cercanas a la actual
    const pagesToShow = [];
    
    // Siempre mostrar la página actual y algunas páginas alrededor
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pagesToShow.push(i);
    }
    
    // Mostrar puntos suspensivos antes de las páginas mostradas si hay un salto
    if (!pagesToShow.includes(2) && pagesToShow.length > 0) {
      links.push(
        <span key="ellipsis-start" className="px-3 py-2">
          ...
        </span>
      );
    }
    
    // Añadir las páginas del medio
    pagesToShow.forEach(page => {
      links.push(
        <Link
          key={`page-${page}`}
          href={getPageUrl(page)}
          className={`px-4 py-2 mx-1 rounded-lg ${
            currentPage === page
              ? 'bg-primary text-white font-bold'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {page}
        </Link>
      );
    });
    
    // Mostrar puntos suspensivos después de las páginas mostradas si hay un salto
    if (!pagesToShow.includes(totalPages - 1) && totalPages > 2) {
      links.push(
        <span key="ellipsis-end" className="px-3 py-2">
          ...
        </span>
      );
    }
    
    // Mostrar siempre la última página si hay más de una
    if (totalPages > 1) {
      links.push(
        <Link
          key={`page-${totalPages}`}
          href={getPageUrl(totalPages)}
          className={`px-4 py-2 mx-1 rounded-lg ${
            currentPage === totalPages
              ? 'bg-primary text-white font-bold'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {totalPages}
        </Link>
      );
    }
    
    return links;
  };

  return (
    <div className="flex flex-wrap justify-center items-center mt-12 mb-8">
      {/* Botón Anterior */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center px-4 py-2 mx-1 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Anterior
        </Link>
      ) : (
        <span className="flex items-center px-4 py-2 mx-1 bg-gray-100 dark:bg-gray-800 rounded-lg opacity-50 cursor-not-allowed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Anterior
        </span>
      )}

      {/* Enlaces a páginas */}
      <div className="hidden sm:flex items-center">
        {renderPageLinks()}
      </div>

      {/* Botón Siguiente */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center px-4 py-2 mx-1 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Siguiente
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      ) : (
        <span className="flex items-center px-4 py-2 mx-1 bg-gray-100 dark:bg-gray-800 rounded-lg opacity-50 cursor-not-allowed">
          Siguiente
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      )}
    </div>
  );
} 