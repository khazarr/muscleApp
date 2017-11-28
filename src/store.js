export default {
  modules: {
    navigator: {
      strict: true,
      namespaced: true,
      state: {
        stack: [],
        options: {}
      },
      mutations: {
        push(state, page) {
          state.stack.push(page);
        },
        pop(state) {
          if (state.stack.length > 1) {
            state.stack.pop();
          }
        },
        replace(state, page) {
          state.stack.pop();
          state.stack.push(page);
        },
        reset(state, page) {
          state.stack = [page || state.stack[0]];
        },
        options(state, newOptions = {}) {
          state.options = newOptions;
        }
      }
    },

    splitter: {
      strict: true,
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle(state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen;
          } else {
            state.open = !state.open;
          }
        }
      }
    },

    tabbar: {
      strict: true,
      namespaced: true,
      state: {
        index: 1
      },
      mutations: {
        set(state, index) {
          state.index = index;
        }
      }
    },

    workout: {
      state: {
        description: {
          streches: 'DYNAMIC STRETCHES - TO GET THE JOINTS NICE AND LOOSE',
          bodyDrills: 'BODYLINE DRILLS - TO FIRE UP YOUR CORE AND REINFORCE PROPER POSITIONS.',
          skillWork: 'SKILL WORK',
          strengthWork: 'STRENGTH WORK'
        },
        streches: [
          {
            name : 'Shoulder rolls',
            reps: '5-10x'
          },
          {
            name : 'Scapular shrugs',
            reps: '5-10x'
          },
          {
            name : 'Cat-camels',
            reps: '5-10x'
          },
          {
            name : 'band: straight arm overhead pull downs',
            reps: '5-10x'
          },
          {
            name : 'band: straight arm chest flies',
            reps: '5-10x'
          },
          {
            name : 'band: dislocates',
            reps: '5-10x'
          },
          {
            name : 'wrist mobility exercises',
            reps: '10+'
          }
        ],
        bodyDrills: [
          {
            name: 'Plank',
            time: '10-60s'
          },
          {
            name: 'Side Plank',
            time: '10-60s'
          },
          {
            name: 'Reverse Plank',
            time: '10-60s'
          },
          {
            name: 'Hollow Hold',
            time: '10-60s'
          },
          {
            name: 'Arch Hold',
            time: '10-60s'
          }
        ],
        skillWork: [
          {
            name: 'Support practice',
            reps: '2-3 min'
          },
          {
            name: 'Handstand progression',
            reps: '5-10min'
          }
        ],
        strengthWork: [
          {
            description: 'FIRST PAIR',
            excercises: [
              {
                name: 'Pull-up progression',
                reps: '3x5-8 '
              },
              {
                name: 'Dip progression',
                reps: '3x5-8 '
              },
            ]
          },
          {
            description: 'SECOND PAIR',
            excercises: [
              {
                name: 'L-sit progression',
                reps: '3x10sec-30sec '
              },
              {
                name: 'Squat/Deadlift',
                reps: '3x5-8 '
              },
            ]
          },
          {
            description: 'THIRD PAIR',
            excercises: [
              {
                name: 'Push-up progression',
                reps: '3x5-8 '
              },
              {
                name: 'Row progression',
                reps: '3x5-8 '
              },
            ]
          }
        ]
      },
      getters: {
        getStretches (state) {
          return state.streches
        },
        getBodyDrills (state) {
          return state.bodyDrills
        },
        getSkillWork (state) {
          return state.skillWork
        },
        getStrengthWork (state) {
          return state.strengthWork
        },
        getWorkoutDescriptions (state) {
          return state.description
        }
      }
    }
  }
};
