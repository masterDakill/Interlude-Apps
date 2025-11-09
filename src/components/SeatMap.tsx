import React, { useState } from 'react';
import { Users, CheckCircle, XCircle, MinusCircle } from 'lucide-react';

interface SeatMapProps {
  showId?: string;
}

interface Seat {
  row: string;
  number: number;
  status: 'available' | 'reserved' | 'unavailable';
  zone: 'orchestra' | 'balcony' | 'vip';
}

export const SeatMap: React.FC<SeatMapProps> = ({ showId }) => {
  const [seats, setSeats] = useState<Map<string, Seat>>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  function generateSeats(): Map<string, Seat> {
    const seatMap = new Map<string, Seat>();
    
    // Rangées AA et BB (balcon, 13-15 sièges)
    ['AA', 'BB'].forEach(row => {
      const count = row === 'AA' ? 13 : 15;
      for (let i = 1; i <= count; i++) {
        seatMap.set(`${row}${i}`, {
          row,
          number: i,
          status: 'available',
          zone: 'balcony',
        });
      }
    });

    // Rangées A, B, C (orchestre principal)
    ['A', 'B', 'C'].forEach(row => {
      for (let i = 1; i <= 16; i++) {
        seatMap.set(`${row}${i}`, {
          row,
          number: i,
          status: 'available',
          zone: row === 'A' ? 'vip' : 'orchestra',
        });
      }
    });

    // Rangées D, E (gradin avec allée centrale)
    ['D', 'E'].forEach(row => {
      for (let i = 1; i <= 12; i++) {
        seatMap.set(`${row}${i}`, {
          row,
          number: i,
          status: 'available',
          zone: 'orchestra',
        });
      }
    });

    // Rangées F-M (sections latérales avec 15-16 sièges)
    ['F', 'G', 'H', 'J', 'K', 'L', 'M'].forEach(row => {
      for (let i = 1; i <= 16; i++) {
        seatMap.set(`${row}${i}`, {
          row,
          number: i,
          status: 'available',
          zone: 'orchestra',
        });
      }
    });

    return seatMap;
  }

  const toggleSeatSelection = (seatId: string) => {
    const seat = seats.get(seatId);
    if (!seat || seat.status === 'unavailable' || seat.status === 'reserved') return;

    const newSelected = new Set(selectedSeats);
    if (newSelected.has(seatId)) {
      newSelected.delete(seatId);
    } else {
      newSelected.add(seatId);
    }
    setSelectedSeats(newSelected);
  };

  const getSeatColor = (seatId: string) => {
    const seat = seats.get(seatId);
    if (!seat) return '#ccc';
    
    if (selectedSeats.has(seatId)) return 'var(--secondary)'; // Gold for selected
    if (seat.status === 'reserved') return 'var(--danger)'; // Red for reserved
    if (seat.status === 'unavailable') return '#666'; // Dark gray
    if (hoveredSeat === seatId) return 'var(--primary-light)'; // Light burgundy on hover
    
    // Available seats by zone
    if (seat.zone === 'vip') return 'var(--primary)'; // Burgundy for VIP
    if (seat.zone === 'balcony') return '#9CA3AF'; // Light gray for balcony
    return '#D1D5DB'; // Default gray for orchestra
  };

  const getStats = () => {
    let available = 0, reserved = 0, selected = 0;
    seats.forEach((seat, id) => {
      if (seat.status === 'available') available++;
      if (seat.status === 'reserved') reserved++;
      if (selectedSeats.has(id)) selected++;
    });
    return { available, reserved, selected, total: seats.size };
  };

  const stats = getStats();

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <Users size={24} />
            Plan de la Salle - Réservation
          </h3>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            <div style={{
              padding: '1rem',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
              borderRadius: '8px',
              border: '1px solid var(--success)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <CheckCircle size={20} color="var(--success)" />
                <strong>Disponibles</strong>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>
                {stats.available}
              </div>
            </div>

            <div style={{
              padding: '1rem',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)',
              borderRadius: '8px',
              border: '1px solid var(--secondary)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <MinusCircle size={20} color="var(--secondary)" />
                <strong>Sélectionnés</strong>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--secondary)' }}>
                {stats.selected}
              </div>
            </div>

            <div style={{
              padding: '1rem',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
              borderRadius: '8px',
              border: '1px solid var(--danger)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <XCircle size={20} color="var(--danger)" />
                <strong>Réservés</strong>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger)' }}>
                {stats.reserved}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{
            padding: '1rem',
            background: 'var(--cream)',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            alignItems: 'center',
          }}>
            <strong>Légende:</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '20px', height: '20px', background: 'var(--primary)', borderRadius: '4px' }}></div>
              <span style={{ fontSize: '0.875rem' }}>VIP (Rangée A)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '20px', height: '20px', background: '#D1D5DB', borderRadius: '4px' }}></div>
              <span style={{ fontSize: '0.875rem' }}>Orchestre</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '20px', height: '20px', background: '#9CA3AF', borderRadius: '4px' }}></div>
              <span style={{ fontSize: '0.875rem' }}>Balcon</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '20px', height: '20px', background: 'var(--secondary)', borderRadius: '4px' }}></div>
              <span style={{ fontSize: '0.875rem' }}>Sélectionné</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '20px', height: '20px', background: 'var(--danger)', borderRadius: '4px' }}></div>
              <span style={{ fontSize: '0.875rem' }}>Réservé</span>
            </div>
          </div>

          {/* Seat Map Image with overlay */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <img
              src="/seat-map.jpg"
              alt="Plan de la salle"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                border: '2px solid var(--border)',
                opacity: 0.3,
              }}
            />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'var(--primary)',
              fontWeight: 700,
              fontSize: '1.5rem',
              fontFamily: "'Playfair Display', serif",
            }}>
              Cliquez sur les sièges ci-dessous pour réserver
            </div>
          </div>

          {/* Interactive Seat Selection (simplified grid view) */}
          <div style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, var(--cream) 0%, var(--white) 100%)',
            borderRadius: '12px',
            border: '2px solid var(--border)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 600,
                marginBottom: '1.5rem',
              }}>
                SCÈNE
              </div>
            </div>

            {/* Simplified seat selection */}
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {['AA', 'BB', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'].map(row => (
                <div key={row} style={{
                  display: 'flex',
                  gap: '0.25rem',
                  marginBottom: '0.5rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <span style={{
                    width: '30px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--primary)',
                  }}>
                    {row}
                  </span>
                  {Array.from({ length: 16 }, (_, i) => i + 1).map(num => {
                    const seatId = `${row}${num}`;
                    const seat = seats.get(seatId);
                    if (!seat) return null;

                    return (
                      <div
                        key={seatId}
                        onClick={() => toggleSeatSelection(seatId)}
                        onMouseEnter={() => setHoveredSeat(seatId)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        style={{
                          width: '24px',
                          height: '24px',
                          background: getSeatColor(seatId),
                          borderRadius: '4px',
                          cursor: seat.status === 'available' ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s',
                          border: selectedSeats.has(seatId) ? '2px solid var(--primary)' : '1px solid rgba(0,0,0,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.625rem',
                          color: selectedSeats.has(seatId) || seat.zone === 'vip' ? 'white' : 'transparent',
                        }}
                        title={`${row}${num} - ${seat.zone}`}
                      >
                        {selectedSeats.has(seatId) && '✓'}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {selectedSeats.size > 0 && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(212, 175, 55, 0.1)',
                borderRadius: '8px',
                border: '2px solid var(--secondary)',
              }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Sièges sélectionnés ({selectedSeats.size}):
                </strong>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                  {Array.from(selectedSeats).join(', ')}
                </div>
                <button
                  className="btn btn-primary"
                  style={{ marginTop: '1rem' }}
                  onClick={() => {
                    alert(`Réservation confirmée pour ${selectedSeats.size} siège(s): ${Array.from(selectedSeats).join(', ')}`);
                    setSelectedSeats(new Set());
                  }}
                >
                  Confirmer la réservation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
