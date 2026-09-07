const Progress = {
  TOTAL_WEEKS: 4,
  TOTAL_PILLARS: 5,
  DAYS_PER_WEEK: 7,
  
  getTotalTasks() { return this.TOTAL_WEEKS * this.TOTAL_PILLARS * this.DAYS_PER_WEEK; },
  
  getCompletedTasks() {
    const state = Storage.getState();
    let completed = 0;
    for (let w = 0; w < this.TOTAL_WEEKS; w++)
      for (let p = 0; p < this.TOTAL_PILLARS; p++)
        for (let d = 0; d < this.DAYS_PER_WEEK; d++)
          if (state[`w${w}-p${p}-d${d}`]) completed++;
    return completed;
  },
  
  getTotalProgress() {
    const total = this.getTotalTasks();
    const completed = this.getCompletedTasks();
    return total > 0 ? completed / total : 0;
  },
  
  getDaysDone() {
    const state = Storage.getState();
    let daysDone = 0;
    for (let w = 0; w < this.TOTAL_WEEKS; w++)
      for (let d = 0; d < this.DAYS_PER_WEEK; d++) {
        let full = true;
        for (let p = 0; p < this.TOTAL_PILLARS; p++)
          if (!state[`w${w}-p${p}-d${d}`]) { full = false; break; }
        if (full) daysDone++;
      }
    return daysDone;
  },
  
  getStatus() {
    const daysDone = this.getDaysDone();
    const progress = this.getTotalProgress();
    return {
      daysDone,
      progress,
      progressPercent: Math.round(progress * 100),
      completed: daysDone >= 28
    };
  },
  
  setTaskCompleted(w, p, d, completed) {
    const key = `w${w}-p${p}-d${d}`;
    if (completed) Storage.set(key, true);
    else Storage.remove(key);
  },
  
  isTaskCompleted(w, p, d) {
    const key = `w${w}-p${p}-d${d}`;
    return !!Storage.get(key);
  }
};
console.log('✓ Progress Module carregado');
