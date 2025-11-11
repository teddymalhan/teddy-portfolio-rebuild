"use client"

import { useState, useEffect } from 'react'
import { Upload, Trash2, Check, FileText, Download, Loader2, Eye, Edit2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

interface ResumeVersion {
  id: number
  filename: string
  path: string
  blob_url: string
  isActive: boolean
  uploadedAt: string
  fileSize?: number
  notes?: string | null
}

export function ResumeManager() {
  const [resumes, setResumes] = useState<ResumeVersion[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [previewResume, setPreviewResume] = useState<ResumeVersion | null>(null)
  const [editingNotes, setEditingNotes] = useState<ResumeVersion | null>(null)
  const [notesText, setNotesText] = useState('')

  useEffect(() => {
    fetchResumes()
  }, [])

  async function fetchResumes() {
    try {
      setLoading(true)
      const res = await fetch('/api/resume/versions')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setResumes(data)
    } catch (error) {
      toast.error('Failed to load resumes')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      toast.success('Resume uploaded successfully')
      fetchResumes()
      // Reset file input
      event.target.value = ''
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload resume')
    } finally {
      setUploading(false)
    }
  }

  async function setActive(resumeId: number) {
    try {
      const res = await fetch('/api/resume/active', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to set active')
      }

      toast.success('Active resume updated')
      fetchResumes()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update active resume')
    }
  }

  async function deleteResume(resumeId: number, filename: string) {
    if (
      !confirm(
        `Are you sure you want to delete "${filename}"? This action cannot be undone.`
      )
    )
      return

    try {
      const res = await fetch(`/api/resume/${resumeId}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Delete failed')
      }

      toast.success('Resume deleted')
      fetchResumes()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete resume')
    }
  }

  function formatFileSize(bytes?: number) {
    if (!bytes) return 'Unknown size'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  function openEditNotes(resume: ResumeVersion) {
    setEditingNotes(resume)
    setNotesText(resume.notes || '')
  }

  async function saveNotes() {
    if (!editingNotes) return

    try {
      const res = await fetch(`/api/resume/${editingNotes.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notesText.trim() || null }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update notes')
      }

      toast.success('Notes updated')
      setEditingNotes(null)
      setNotesText('')
      fetchResumes()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update notes')
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Upload New Resume</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Upload a new PDF resume. Maximum file size: 10MB
        </p>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
          <Button disabled={uploading} asChild>
            <span>
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose PDF File
                </>
              )}
            </span>
          </Button>
        </label>
      </Card>

      {/* Resume List */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Resume Versions</h2>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : resumes.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            No resumes uploaded yet. Upload your first resume above.
          </p>
        ) : (
          <div className="space-y-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-5 h-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{resume.filename}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>
                        {new Date(resume.uploadedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span>•</span>
                      <span>{formatFileSize(resume.fileSize)}</span>
                    </div>
                    {resume.notes && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {resume.notes}
                      </p>
                    )}
                  </div>
                  {resume.isActive && (
                    <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-600 dark:text-green-400 rounded-full shrink-0">
                      Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditNotes(resume)}
                    title="Edit notes"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewResume(resume)}
                    title="Preview resume"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <a
                    href={resume.path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" title="Download resume">
                      <Download className="w-4 h-4" />
                    </Button>
                  </a>
                  {!resume.isActive && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActive(resume.id)}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Set Active
                    </Button>
                  )}
                  {!resume.isActive && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteResume(resume.id, resume.filename)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Preview Dialog */}
      <Dialog open={!!previewResume} onOpenChange={(open) => !open && setPreviewResume(null)}>
        <DialogContent className="!max-w-none !w-screen !h-screen !top-0 !left-0 !translate-x-0 !translate-y-0 !m-0 !rounded-none !p-0 flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
            <DialogTitle>{previewResume?.filename}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden p-6 min-h-0">
            {previewResume && (
              <iframe
                src={previewResume.path}
                className="w-full h-full border-0 rounded-lg"
                title={`Preview of ${previewResume.filename}`}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Notes Dialog */}
      <Dialog open={!!editingNotes} onOpenChange={(open) => !open && setEditingNotes(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Notes - {editingNotes?.filename}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Add notes about this resume version (e.g., 'Updated for tech roles', 'Added new project')..."
              className="w-full min-h-[120px] px-3 py-2 text-sm rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              rows={5}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditingNotes(null)
                setNotesText('')
              }}
            >
              Cancel
            </Button>
            <Button onClick={saveNotes}>
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


