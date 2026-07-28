Add-Type -AssemblyName System.Drawing

$dir = Join-Path $PSScriptRoot "..\public\products\black"
$maxWidth = 1200
$quality = 82

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq "image/jpeg" }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, [int]$quality)

Get-ChildItem -Path $dir -Filter *.png | ForEach-Object {
  $src = $_.FullName
  $img = [System.Drawing.Image]::FromFile($src)
  $ratio = [Math]::Min(1.0, $maxWidth / $img.Width)
  $w = [int]($img.Width * $ratio)
  $h = [int]($img.Height * $ratio)

  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $w, $h)
  $g.Dispose()
  $img.Dispose()

  $out = Join-Path $dir ($_.BaseName + ".jpg")
  $bmp.Save($out, $encoder, $params)
  $bmp.Dispose()

  Write-Host ("{0} -> {1} ({2}x{3}, {4} KB)" -f $_.Name, (Split-Path $out -Leaf), $w, $h,
    [int]((Get-Item $out).Length / 1KB))
}
