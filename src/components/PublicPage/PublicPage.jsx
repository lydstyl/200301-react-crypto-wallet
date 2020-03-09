import React from 'react';

export const PublicPage = () => {
  return (
    <div className='presentation'>
      <h2>Présentation de l'application</h2>
      <div className='flexer'>
        <div className='txt'>
          <p>
            L'idée ici est de faciliter la vie des investisseurs via cet outil
            pour suivre votre portefeuille de cryptomonnaie.
          </p>
          <p>
            Cette application vous permet notamment de visualiser la composition
            et valeur votre portefeuille ainsi que son historique.
          </p>
        </div>
        <iframe
          title="Présentation de l'application"
          width='auto'
          height='auto'
          src='https://www.youtube.com/embed/C5bDQDjBz6I'
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
