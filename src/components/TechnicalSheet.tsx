import React, { useState } from 'react';
import { FileText, Plus, Trash2, Printer, Download } from 'lucide-react';
import { Show, ChannelRequirement, BacklineItem, PowerRequirement } from '../types';
import { formatDateTime } from '../utils/helpers';

interface TechnicalSheetProps {
  shows: Show[];
  onUpdateShow: (show: Show) => void;
}

export const TechnicalSheet: React.FC<TechnicalSheetProps> = ({ shows, onUpdateShow }) => {
  const [selectedShowId, setSelectedShowId] = useState<string>('');

  const selectedShow = shows.find(s => s.id === selectedShowId);

  const addChannel = () => {
    if (!selectedShow) return;
    const newChannel: ChannelRequirement = {
      number: selectedShow.technicalSheet.sound.channels.length + 1,
      instrument: '',
    };
    const updatedShow = {
      ...selectedShow,
      technicalSheet: {
        ...selectedShow.technicalSheet,
        sound: {
          ...selectedShow.technicalSheet.sound,
          channels: [...selectedShow.technicalSheet.sound.channels, newChannel],
        },
      },
      updatedAt: new Date(),
    };
    onUpdateShow(updatedShow);
  };

  const updateChannel = (index: number, field: keyof ChannelRequirement, value: string | boolean) => {
    if (!selectedShow) return;
    const channels = [...selectedShow.technicalSheet.sound.channels];
    channels[index] = { ...channels[index], [field]: value };
    const updatedShow = {
      ...selectedShow,
      technicalSheet: {
        ...selectedShow.technicalSheet,
        sound: {
          ...selectedShow.technicalSheet.sound,
          channels,
        },
      },
      updatedAt: new Date(),
    };
    onUpdateShow(updatedShow);
  };

  const removeChannel = (index: number) => {
    if (!selectedShow) return;
    const channels = selectedShow.technicalSheet.sound.channels.filter((_, i) => i !== index);
    const renumbered = channels.map((ch, i) => ({ ...ch, number: i + 1 }));
    const updatedShow = {
      ...selectedShow,
      technicalSheet: {
        ...selectedShow.technicalSheet,
        sound: {
          ...selectedShow.technicalSheet.sound,
          channels: renumbered,
        },
      },
      updatedAt: new Date(),
    };
    onUpdateShow(updatedShow);
  };

  const addBacklineItem = () => {
    if (!selectedShow) return;
    const newItem: BacklineItem = {
      item: '',
      quantity: 1,
      provided: false,
    };
    const updatedShow = {
      ...selectedShow,
      technicalSheet: {
        ...selectedShow.technicalSheet,
        backline: [...selectedShow.technicalSheet.backline, newItem],
      },
      updatedAt: new Date(),
    };
    onUpdateShow(updatedShow);
  };

  const updateBacklineItem = (index: number, field: keyof BacklineItem, value: string | number | boolean) => {
    if (!selectedShow) return;
    const backline = [...selectedShow.technicalSheet.backline];
    backline[index] = { ...backline[index], [field]: value };
    const updatedShow = {
      ...selectedShow,
      technicalSheet: {
        ...selectedShow.technicalSheet,
        backline,
      },
      updatedAt: new Date(),
    };
    onUpdateShow(updatedShow);
  };

  const removeBacklineItem = (index: number) => {
    if (!selectedShow) return;
    const backline = selectedShow.technicalSheet.backline.filter((_, i) => i !== index);
    const updatedShow = {
      ...selectedShow,
      technicalSheet: {
        ...selectedShow.technicalSheet,
        backline,
      },
      updatedAt: new Date(),
    };
    onUpdateShow(updatedShow);
  };

  const updateStageInfo = (field: string, value: string | number) => {
    if (!selectedShow) return;
    const updatedShow = {
      ...selectedShow,
      technicalSheet: {
        ...selectedShow.technicalSheet,
        stage: {
          ...selectedShow.technicalSheet.stage,
          [field]: value,
        },
      },
      updatedAt: new Date(),
    };
    onUpdateShow(updatedShow);
  };

  const updateSoundInfo = (field: string, value: string | number) => {
    if (!selectedShow) return;
    const updatedShow = {
      ...selectedShow,
      technicalSheet: {
        ...selectedShow.technicalSheet,
        sound: {
          ...selectedShow.technicalSheet.sound,
          [field]: value,
        },
      },
      updatedAt: new Date(),
    };
    onUpdateShow(updatedShow);
  };

  const updateLightingInfo = (field: string, value: string) => {
    if (!selectedShow) return;
    const updatedShow = {
      ...selectedShow,
      technicalSheet: {
        ...selectedShow.technicalSheet,
        lighting: {
          ...selectedShow.technicalSheet.lighting,
          [field]: value,
        },
      },
      updatedAt: new Date(),
    };
    onUpdateShow(updatedShow);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    if (!selectedShow) return;
    
    const content = generateTechSheetText(selectedShow);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedShow.name.replace(/\s+/g, '_')}_tech_sheet.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateTechSheetText = (show: Show): string => {
    let text = `TECHNICAL RIDER\n`;
    text += `${'='.repeat(50)}\n\n`;
    text += `Show: ${show.name}\n`;
    text += `Venue: ${show.venue}\n`;
    text += `Date: ${formatDateTime(show.date)}\n\n`;

    text += `STAGE REQUIREMENTS\n${'-'.repeat(50)}\n`;
    if (show.technicalSheet.stage.width || show.technicalSheet.stage.depth) {
      text += `Stage Size: ${show.technicalSheet.stage.width || 'N/A'}' x ${show.technicalSheet.stage.depth || 'N/A'}'\n`;
    }
    if (show.technicalSheet.stage.risers) {
      text += `Risers: ${show.technicalSheet.stage.risers}\n`;
    }
    text += `\n`;

    text += `SOUND REQUIREMENTS\n${'-'.repeat(50)}\n`;
    text += `Monitors Required: ${show.technicalSheet.sound.monitors || 0}\n`;
    if (show.technicalSheet.sound.monitorMix) {
      text += `Monitor Mix: ${show.technicalSheet.sound.monitorMix}\n`;
    }
    if (show.technicalSheet.sound.pa) {
      text += `PA Requirements: ${show.technicalSheet.sound.pa}\n`;
    }
    text += `\n`;

    if (show.technicalSheet.sound.channels.length > 0) {
      text += `CHANNEL LIST\n${'-'.repeat(50)}\n`;
      show.technicalSheet.sound.channels.forEach(ch => {
        text += `CH ${ch.number}: ${ch.instrument}`;
        if (ch.micType) text += ` (${ch.micType})`;
        if (ch.diBox) text += ` [DI]`;
        if (ch.phantom48v) text += ` [48V]`;
        if (ch.notes) text += ` - ${ch.notes}`;
        text += `\n`;
      });
      text += `\n`;
    }

    if (show.technicalSheet.backline.length > 0) {
      text += `BACKLINE\n${'-'.repeat(50)}\n`;
      show.technicalSheet.backline.forEach(item => {
        text += `${item.quantity}x ${item.item}`;
        text += item.provided ? ' (PROVIDED)' : ' (REQUIRED)';
        if (item.notes) text += ` - ${item.notes}`;
        text += `\n`;
      });
      text += `\n`;
    }

    if (show.technicalSheet.lighting.type || show.technicalSheet.lighting.notes) {
      text += `LIGHTING\n${'-'.repeat(50)}\n`;
      if (show.technicalSheet.lighting.type) {
        text += `Type: ${show.technicalSheet.lighting.type}\n`;
      }
      if (show.technicalSheet.lighting.notes) {
        text += `Notes: ${show.technicalSheet.lighting.notes}\n`;
      }
      text += `\n`;
    }

    if (show.technicalSheet.additionalNotes) {
      text += `ADDITIONAL NOTES\n${'-'.repeat(50)}\n`;
      text += `${show.technicalSheet.additionalNotes}\n`;
    }

    return text;
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Technical Rider</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {selectedShow && (
              <>
                <button className="btn btn-outline btn-small" onClick={handleExport}>
                  <Download size={16} /> Export
                </button>
                <button className="btn btn-primary btn-small" onClick={handlePrint}>
                  <Printer size={16} /> Print
                </button>
              </>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Select Show</label>
          <select
            className="form-select"
            value={selectedShowId}
            onChange={(e) => setSelectedShowId(e.target.value)}
          >
            <option value="">Choose a show...</option>
            {shows.map((show) => (
              <option key={show.id} value={show.id}>
                {show.name} - {formatDateTime(show.date)}
              </option>
            ))}
          </select>
        </div>

        {selectedShow ? (
          <div>
            {/* Stage Requirements */}
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Stage Requirements</h3>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Stage Width (feet)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={selectedShow.technicalSheet.stage.width || ''}
                    onChange={(e) => updateStageInfo('width', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 24"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Stage Depth (feet)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={selectedShow.technicalSheet.stage.depth || ''}
                    onChange={(e) => updateStageInfo('depth', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 20"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Risers</label>
                <input
                  type="text"
                  className="form-input"
                  value={selectedShow.technicalSheet.stage.risers || ''}
                  onChange={(e) => updateStageInfo('risers', e.target.value)}
                  placeholder="e.g., 2x 4'x8' drum riser"
                />
              </div>
            </div>

            {/* Sound Requirements */}
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Sound Requirements</h3>
                <button className="btn btn-primary btn-small" onClick={addChannel}>
                  <Plus size={16} /> Add Channel
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Monitor Wedges Required</label>
                  <input
                    type="number"
                    className="form-input"
                    value={selectedShow.technicalSheet.sound.monitors || 0}
                    onChange={(e) => updateSoundInfo('monitors', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Monitor Mix Preference</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedShow.technicalSheet.sound.monitorMix || ''}
                    onChange={(e) => updateSoundInfo('monitorMix', e.target.value)}
                    placeholder="e.g., 2 stereo mixes"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">PA Requirements</label>
                <input
                  type="text"
                  className="form-input"
                  value={selectedShow.technicalSheet.sound.pa || ''}
                  onChange={(e) => updateSoundInfo('pa', e.target.value)}
                  placeholder="e.g., House PA acceptable, prefer 4K+ system"
                />
              </div>

              {/* Channel List */}
              {selectedShow.technicalSheet.sound.channels.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Channel List</h4>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                          <th style={{ padding: '0.75rem' }}>CH</th>
                          <th style={{ padding: '0.75rem' }}>Instrument</th>
                          <th style={{ padding: '0.75rem' }}>Mic Type</th>
                          <th style={{ padding: '0.75rem' }}>DI</th>
                          <th style={{ padding: '0.75rem' }}>48V</th>
                          <th style={{ padding: '0.75rem' }}>Notes</th>
                          <th style={{ padding: '0.75rem' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedShow.technicalSheet.sound.channels.map((channel, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '0.75rem' }}>{channel.number}</td>
                            <td style={{ padding: '0.75rem' }}>
                              <input
                                type="text"
                                className="form-input"
                                value={channel.instrument}
                                onChange={(e) => updateChannel(index, 'instrument', e.target.value)}
                                placeholder="e.g., Kick Drum"
                              />
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <input
                                type="text"
                                className="form-input"
                                value={channel.micType || ''}
                                onChange={(e) => updateChannel(index, 'micType', e.target.value)}
                                placeholder="e.g., SM57"
                              />
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                              <input
                                type="checkbox"
                                checked={channel.diBox || false}
                                onChange={(e) => updateChannel(index, 'diBox', e.target.checked)}
                                style={{ width: '20px', height: '20px' }}
                              />
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                              <input
                                type="checkbox"
                                checked={channel.phantom48v || false}
                                onChange={(e) => updateChannel(index, 'phantom48v', e.target.checked)}
                                style={{ width: '20px', height: '20px' }}
                              />
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <input
                                type="text"
                                className="form-input"
                                value={channel.notes || ''}
                                onChange={(e) => updateChannel(index, 'notes', e.target.value)}
                                placeholder="Notes..."
                              />
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <button
                                className="btn btn-small btn-danger"
                                onClick={() => removeChannel(index)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Backline */}
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Backline</h3>
                <button className="btn btn-primary btn-small" onClick={addBacklineItem}>
                  <Plus size={16} /> Add Item
                </button>
              </div>

              {selectedShow.technicalSheet.backline.length === 0 ? (
                <p style={{ color: 'var(--gray)', fontSize: '0.875rem' }}>No backline items added yet.</p>
              ) : (
                <div>
                  {selectedShow.technicalSheet.backline.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 80px 100px 2fr 50px',
                        gap: '0.75rem',
                        alignItems: 'center',
                        marginBottom: '0.75rem',
                        padding: '0.75rem',
                        background: 'var(--light-gray)',
                        borderRadius: '0.5rem',
                      }}
                    >
                      <input
                        type="text"
                        className="form-input"
                        value={item.item}
                        onChange={(e) => updateBacklineItem(index, 'item', e.target.value)}
                        placeholder="e.g., Guitar Amp"
                      />
                      <input
                        type="number"
                        className="form-input"
                        value={item.quantity}
                        onChange={(e) => updateBacklineItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        min="1"
                      />
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                        <input
                          type="checkbox"
                          checked={item.provided}
                          onChange={(e) => updateBacklineItem(index, 'provided', e.target.checked)}
                          style={{ width: '18px', height: '18px' }}
                        />
                        Provided
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.notes || ''}
                        onChange={(e) => updateBacklineItem(index, 'notes', e.target.value)}
                        placeholder="Notes..."
                      />
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => removeBacklineItem(index)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Lighting */}
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Lighting</h3>
              <div className="form-group">
                <label className="form-label">Lighting Type</label>
                <input
                  type="text"
                  className="form-input"
                  value={selectedShow.technicalSheet.lighting.type || ''}
                  onChange={(e) => updateLightingInfo('type', e.target.value)}
                  placeholder="e.g., Standard wash, moving heads"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Lighting Notes</label>
                <textarea
                  className="form-textarea"
                  value={selectedShow.technicalSheet.lighting.notes || ''}
                  onChange={(e) => updateLightingInfo('notes', e.target.value)}
                  placeholder="Special requirements, colors, effects..."
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Additional Notes</h3>
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  value={selectedShow.technicalSheet.additionalNotes || ''}
                  onChange={(e) => {
                    if (!selectedShow) return;
                    const updatedShow = {
                      ...selectedShow,
                      technicalSheet: {
                        ...selectedShow.technicalSheet,
                        additionalNotes: e.target.value,
                      },
                      updatedAt: new Date(),
                    };
                    onUpdateShow(updatedShow);
                  }}
                  placeholder="Any other technical requirements or notes..."
                  style={{ minHeight: '120px' }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <FileText size={64} className="empty-state-icon" />
            <h3 className="empty-state-title">Select a show</h3>
            <p className="empty-state-text">Choose a show to create or edit its technical rider</p>
          </div>
        )}
      </div>
    </div>
  );
};
