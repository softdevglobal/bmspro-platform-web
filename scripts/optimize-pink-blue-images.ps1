Add-Type -AssemblyName System.Drawing

function Convert-ToJpg($srcPath, $maxWidth = 1200, $quality = 82) {
  if (-not (Test-Path $srcPath)) { Write-Host "skip missing $srcPath"; return }
  $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }
  $params = New-Object System.Drawing.Imaging.EncoderParameters 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, [int]$quality)

  $img = [System.Drawing.Image]::FromFile($srcPath)
  $ratio = [Math]::Min(1.0, $maxWidth / $img.Width)
  $w = [int]($img.Width * $ratio)
  $h = [int]($img.Height * $ratio)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $w, $h)
  $g.Dispose(); $img.Dispose()

  $dir = Split-Path $srcPath -Parent
  $base = [IO.Path]::GetFileNameWithoutExtension($srcPath)
  $out = Join-Path $dir ($base + ".jpg")
  $bmp.Save($out, $encoder, $params)
  $bmp.Dispose()
  Remove-Item $srcPath -Force
  Write-Host ("{0} -> {1} ({2}x{3}, {4} KB)" -f (Split-Path $srcPath -Leaf), (Split-Path $out -Leaf), $w, $h,
    [int]((Get-Item $out).Length / 1KB))
}

function Resize-Icon($srcPath) {
  if (-not (Test-Path $srcPath)) { return }
  $img = [System.Drawing.Image]::FromFile($srcPath)
  $bmp = New-Object System.Drawing.Bitmap 256, 256, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, 256, 256)
  $g.Dispose(); $img.Dispose()
  $tmp = Join-Path (Split-Path $srcPath) "icon-tmp.png"
  $bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Move-Item $tmp $srcPath -Force
  Write-Host ("icon.png resized {0} KB" -f [int]((Get-Item $srcPath).Length / 1KB))
}

$root = Join-Path $PSScriptRoot "..\public\products"

@(
  "pink\stylist-focus.png",
  "pink\front-desk.png",
  "pink\stylist-portrait.png",
  "pink\sms-phone.png",
  "pink\salon-bay.png",
  "pink\hero.png",
  "blue\tradesperson-focus.png",
  "blue\job-site.png",
  "blue\tradesperson-portrait.png",
  "blue\front-desk.png",
  "blue\sms-phone.png",
  "blue\hero.png",
  "blue\jobs.png"
) | ForEach-Object { Convert-ToJpg (Join-Path $root $_) }

Resize-Icon (Join-Path $root "pink\icon.png")
Resize-Icon (Join-Path $root "blue\icon.png")
