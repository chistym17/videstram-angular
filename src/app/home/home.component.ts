import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
        <p class="text-gray-600 mb-6">This is a test component to verify Tailwind CSS is working properly.</p>
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
          Click Me
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {} 