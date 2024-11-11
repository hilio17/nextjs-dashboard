import React from 'react';

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
} export default LoadingSpinner