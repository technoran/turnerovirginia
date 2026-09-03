// Control de pantallas
let currentScreen = 1;

function goToScreen(screenNumber) {
  document.getElementById(`screen${currentScreen}`).classList.remove('active');
  currentScreen = screenNumber;
  document.getElementById(`screen${screenNumber}`).classList.add('active');
  window.scrollTo(0, 0);
}

// Calendario
let selectedDate = null;
let selectedTime = null;
let currentMonth = new Date();

function renderCalendar() {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  // Primer día del mes
  const firstDay = new Date(year, month, 1).getDay();
  // Últimos día del mes
  const lastDay = new Date(year, month + 1, 0).getDate();
  
  const monthName = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' }).format(currentMonth);
  document.getElementById('currentMonth').textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  
  const calendarDays = document.getElementById('calendarDays');
  calendarDays.innerHTML = '';
  
  // Días vacíos del mes anterior
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'cal-day disabled';
    calendarDays.appendChild(emptyDay);
  }
  
  // Días del mes
  for (let day = 1; day <= lastDay; day++) {
    const dayEl = document.createElement('button');
    dayEl.className = 'cal-day available';
    dayEl.textContent = day;
    
    const dateObj = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Deshabilitar días pasados
    if (dateObj < today) {
      dayEl.className = 'cal-day disabled';
      dayEl.disabled = true;
    } else {
      dayEl.onclick = () => selectDate(dateObj, dayEl);
    }
    
    calendarDays.appendChild(dayEl);
  }
}

function prevMonth() {
  currentMonth.setMonth(currentMonth.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  renderCalendar();
}

function selectDate(date, element) {
  // Remover selección anterior
  document.querySelectorAll('.cal-day.selected').forEach(el => {
    el.classList.remove('selected');
  });
  
  element.classList.add('selected');
  selectedDate = date;
  
  // Mostrar horarios disponibles
  showTimeSlots();
}

function showTimeSlots() {
  const timeSlotsDiv = document.getElementById('timeSlots');
  const timeOptionsDiv = document.getElementById('timeOptions');
  
  const dateStr = selectedDate.toLocaleDateString('es-AR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  document.getElementById('selectedDate').textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  
  // Horarios disponibles de ejemplo
  const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  
  timeOptionsDiv.innerHTML = '';
  horarios.forEach(hora => {
    const btn = document.createElement('button');
    btn.className = 'time-option';
    btn.textContent = hora;
    btn.onclick = () => selectTime(hora, btn);
    timeOptionsDiv.appendChild(btn);
  });
  
  timeSlotsDiv.style.display = 'block';
}

function selectTime(hora, element) {
  document.querySelectorAll('.time-option.selected').forEach(el => {
    el.classList.remove('selected');
  });
  
  element.classList.add('selected');
  selectedTime = hora;
  
  // Mostrar resumen
  showBookingSummary();
}

function showBookingSummary() {
  const summaryDiv = document.getElementById('bookingSummary');
  
  const dateStr = selectedDate.toLocaleDateString('es-AR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
  
  document.getElementById('summaryDate').textContent = dateStr;
  document.getElementById('summaryTime').textContent = selectedTime;
  
  summaryDiv.style.display = 'block';
}

function confirmBooking() {
  const dateStr = selectedDate.toLocaleDateString('es-AR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
  
  // Aquí enviar a Mercado Pago o procesar el turno
  alert(`Turno confirmado:\n${dateStr} a las ${selectedTime}\n\nRedirigiendo a pago...`);
  
  // Redirigir a Mercado Pago
  // window.location.href = 'https://tu-url-mercado-pago.com';
}

function openWhatsApp() {
  window.open('https://wa.me/5493534790232?text=Hola%20María%2C%20quiero%20consultar%20sobre%20mis%20opciones%20de%20consulta', '_blank');
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
});