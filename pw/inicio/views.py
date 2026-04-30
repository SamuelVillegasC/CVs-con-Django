from django.shortcuts import render, redirect
from .models import Servicio

def index(request):
    servicios = Servicio.objects.all()
    return render(request, 'index.html', {'servicios': servicios})

def catalogo(request):
    servicios = Servicio.objects.all()
    return render(request, 'catalogo.html', {'servicios': servicios})

def alta(request):
    if request.method == 'POST':

        nombre = request.POST.get('nombre')
        descripcion = request.POST.get('descripcion')
        precio = request.POST.get('precio')
        
        Servicio.objects.create(nombre=nombre, descripcion=descripcion, precio=precio)
        return redirect('index') 
    return render(request, 'alta.html')