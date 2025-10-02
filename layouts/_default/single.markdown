{{- /* Template for rendering pages as clean markdown */ -}}
{{- $title := .Title -}}
# {{ $title }}

{{- if .Params.description }}

{{ .Params.description }}
{{- end }}

{{ .RawContent }}
