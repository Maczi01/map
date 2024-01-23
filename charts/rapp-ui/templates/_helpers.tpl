{{/*
Expand the name of the chart.
*/}}
{{- define "rapp-ui.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "rapp-ui.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "rapp-ui.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "rapp-ui.labels" -}}
helm.sh/chart: {{ include "rapp-ui.chart" . }}
{{ include "rapp-ui.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Checksum annotations for pod
*/}}
{{- define "rapp-ui.checksum" -}}
{{- range $k, $v := $.Values.checksum }}
"checksum/{{$k}}": {{ include (print $.Template.BasePath $v) $ | sha256sum }}
{{- end }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "rapp-ui.selectorLabels" -}}
app.kubernetes.io/name: {{ include "rapp-ui.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "rapp-ui.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "rapp-ui.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Get the service protocol (HTTP/HTTPS)
*/}}
{{- define "rapp-ui.service-protocol" -}}
{{- if eq (include "rapp-ui.is-tls-enabled" .) "true" }}
{{- printf "https" }}
{{- else }}
{{- printf "http" }}
{{- end -}}
{{- end -}}


{{/*
Check if TLS is enabled by checking both global and microservice Helm values. If microservice is configured, it takes precedence.
*/}}
{{- define "rapp-ui.is-tls-enabled" -}}
{{ ternary .Values.tls.enabled .Values.global.tls.enabled (hasKey .Values.tls "enabled") }}
{{- end -}}

{{/*
Get name for the internal ca certificate secret
*/}}
{{- define "get-internal-ca-secret-fullname" -}}
{{- printf "%s-%s-%s" .Release.Name .Release.Namespace .Values.global.tls.ca.secrets.internal.name }}
{{- end -}}

{{/*
Get name for the internal ca certificate
*/}}
{{- define "get-internal-ca-fullname" -}}
{{- printf "%s-internal-ca" .Release.Name }}
{{- end -}}

{{/*
Get name for the tls certificate secret
*/}}
{{- define "rapp-ui.get-tls-certificate-secret-name" -}}
{{- printf "%s-server-certificate" (include "rapp-ui.fullname" .) }}
{{- end -}}

{{/*
Generate registr/repository/image:tag path for a given image
*/}}
{{- define "rapp-ui.get-image-fullpath" }}
{{- $registry := (index .global "imageRegistry") -}}
{{- $repository := (index .local .imageName ).repository -}}
{{- $tag := (index .local .imageName ).tag -}}
{{- if (index .local .imageName ).registry }}
{{- $registry = (index .local .imageName ).registry -}}
{{- end }}
{{- printf "%s/%s/%s:%s" $registry $repository .imageName $tag }}
{{- end }}

{{/*
Generate image pull secret
*/}}
{{- define "rapp-ui.get-image-pull-secrets" }}
{{- if gt (len .Values.global.imagePullSecrets) 0 }}
{{- join "," .Values.global.imagePullSecrets }}
{{- else if gt (len .Values.image.pullSecrets) 0 }}
{{- join "," .Values.image.pullSecrets }}
{{- end }}
{{- end }}


{{/*
Generate the name of the SecurityContextConstraint
*/}}
{{- define "scc.name" }}
{{- $sccName := (printf "%s-%s" .Release.Name .Release.Namespace) }}
{{- if not ( empty .Values.securityContextConstraint ) }}
{{- $sccName = .Values.securityContextConstraint  -}}
{{- else if not ( empty .Values.global.securityContextConstraint ) }}
{{- $sccName = .Values.global.securityContextConstraint  -}}
{{- end }}
{{- printf "%s" $sccName }}
{{- end }}
