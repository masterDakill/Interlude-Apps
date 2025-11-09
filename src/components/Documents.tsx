import React from 'react';
import { FolderOpen, ExternalLink, FileText, Music as MusicIcon, Image, Video } from 'lucide-react';

export const Documents: React.FC = () => {
  const dropboxUrl = 'https://www.dropbox.com/scl/fo/jausnqqj81g7xhwbbfwi7/AGIxD2F502SFZ9Uo2NfAsU8?rlkey=3egvp2s8q9q44z3ltlruqhoq4&e=1&st=p492arh5&dl=0';

  const documentCategories = [
    {
      title: 'Partitions',
      icon: <MusicIcon size={32} />,
      description: 'Partitions musicales et arrangements',
      color: 'var(--primary)',
    },
    {
      title: 'Documents Techniques',
      icon: <FileText size={32} />,
      description: 'Fiches techniques et rider de scène',
      color: 'var(--secondary)',
    },
    {
      title: 'Médias',
      icon: <Image size={32} />,
      description: 'Photos, affiches et visuels',
      color: 'var(--accent)',
    },
    {
      title: 'Vidéos',
      icon: <Video size={32} />,
      description: 'Enregistrements et extraits de spectacles',
      color: 'var(--success)',
    },
  ];

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Documents Spectacle Interlude</h2>
          <a
            href={dropboxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <ExternalLink size={20} />
            Ouvrir Dropbox
          </a>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--gray)', lineHeight: '1.8' }}>
            Accédez à tous les documents, partitions, photos et vidéos du Spectacle Interlude
            dans notre dossier Dropbox partagé.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {documentCategories.map((category, index) => (
            <div
              key={index}
              className="list-item"
              style={{
                borderLeftColor: category.color,
                cursor: 'default',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    color: category.color,
                    padding: '0.75rem',
                    background: `${category.color}15`,
                    borderRadius: '12px',
                  }}
                >
                  {category.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--primary)',
                      marginBottom: '0.5rem',
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {category.title}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--gray)' }}>
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dropbox Integration Info */}
        <div
          className="card"
          style={{
            marginTop: '2rem',
            background: 'linear-gradient(135deg, var(--cream) 0%, var(--white) 100%)',
            border: '2px solid var(--border)',
          }}
        >
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--primary)',
              marginBottom: '1.5rem',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Comment accéder aux documents
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div
                style={{
                  minWidth: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                  color: 'var(--white)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                1
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--dark)' }}>
                  Cliquez sur "Ouvrir Dropbox"
                </h4>
                <p style={{ color: 'var(--gray)', fontSize: '0.9375rem' }}>
                  Le bouton en haut de cette page vous dirigera vers le dossier Dropbox partagé.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div
                style={{
                  minWidth: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, var(--secondary) 0%, var(--secondary-dark) 100%)',
                  color: 'var(--dark)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                2
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--dark)' }}>
                  Parcourez les dossiers
                </h4>
                <p style={{ color: 'var(--gray)', fontSize: '0.9375rem' }}>
                  Naviguez dans les différents dossiers pour trouver les partitions, photos, vidéos et documents techniques.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div
                style={{
                  minWidth: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%)',
                  color: 'var(--dark)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                3
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--dark)' }}>
                  Téléchargez ou consultez
                </h4>
                <p style={{ color: 'var(--gray)', fontSize: '0.9375rem' }}>
                  Téléchargez les fichiers dont vous avez besoin ou consultez-les directement en ligne.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(139, 21, 56, 0.05)',
            borderRadius: '12px',
            border: '1px solid var(--border)',
          }}
        >
          <h4
            style={{
              fontWeight: 600,
              marginBottom: '1rem',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <FolderOpen size={20} />
            Informations importantes
          </h4>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: 'var(--gray)', lineHeight: '1.8' }}>
            <li>Le dossier Dropbox est mis à jour régulièrement avec de nouveaux documents.</li>
            <li>Vous pouvez marquer les fichiers importants comme favoris dans Dropbox.</li>
            <li>Si vous avez besoin d'un accès complet, contactez l'administrateur du compte.</li>
            <li>Les fichiers volumineux (vidéos) peuvent prendre du temps à charger selon votre connexion.</li>
          </ul>
        </div>

        {/* Quick Access Button */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a
            href={dropboxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '1.125rem', padding: '1rem 2.5rem' }}
          >
            <ExternalLink size={24} />
            Accéder aux documents maintenant
          </a>
        </div>
      </div>
    </div>
  );
};
